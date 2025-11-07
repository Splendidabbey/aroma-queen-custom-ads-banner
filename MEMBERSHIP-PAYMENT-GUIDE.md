# Mitgliedschafts-Kauf-System - Zahlungsfluss Dokumentation

## Übersicht

Dieses System ermöglicht es Kunden, Mitgliedschaften über eine Landing Page zu kaufen. Der gesamte Prozess ist in Deutsch und umfasst:

1. **Landing Page** - Zeigt Mitgliedschaftsoptionen und Preise
2. **Zahlungsseite** - Formular für Kundendaten und Zahlungsmethode
3. **Danke-Seite** - Bestätigung nach erfolgreichem Kauf
4. **E-Mail-Bestätigung** - Automatische Rechnung/Bestellbestätigung

## Zahlungsfluss - Schritt für Schritt

### 1. Landing Page ("Kaufen Sie Ihre Mitgliedschaft hier")

**URL:** Wird über den Connector `above-main-container` angezeigt, wenn aktiviert

**Funktionen:**
- Zeigt Basic Account und optional Premium Account
- Jede Mitgliedschaft zeigt zwei Zahlungsoptionen:
  - **Einmalzahlung** (z.B. €49.00)
  - **Ratenzahlung** (z.B. 12x €4.49/Monat)
- Kunde klickt auf "Jetzt kaufen" oder "Ratenzahlung wählen"
- Weiterleitung zur Zahlungsseite mit Parametern:
  - `membership=basic` oder `membership=premium`
  - `payment_type=onetime` oder `payment_type=installment`

**Beispiel-URL nach Klick:**
```
/membership/payment?membership=basic&payment_type=onetime
```

### 2. Zahlungsseite

**URL:** `/membership/payment`

**Funktionen:**
- Zeigt Bestellübersicht (Mitgliedschaftstyp, Zahlungsplan, Gesamtbetrag)
- Formular für:
  - **Persönliche Informationen:**
    - Vorname *
    - Nachname *
    - E-Mail-Adresse *
    - Telefonnummer
  - **Rechnungsadresse:**
    - Straße und Hausnummer *
    - Postleitzahl *
    - Stadt *
    - Land * (Dropdown mit europäischen Ländern)
  - **Zahlungsmethode:**
    - Kreditkarte (Stripe)
    - PayPal
  - **AGB und Datenschutz:**
    - Checkbox für AGB *
    - Checkbox für Datenschutzerklärung *

**Zahlungsverarbeitung:**
1. Kunde füllt Formular aus
2. Kunde wählt Zahlungsmethode
3. Bei Kreditkarte: Stripe-Element wird angezeigt (wenn Stripe konfiguriert)
4. Kunde klickt "Kauf abschließen"
5. Formular wird an Backend-API gesendet: `POST /aroma-membership/process-payment`

**Backend-Verarbeitung:**
```ruby
# In plugin.rb - PaymentController#process_payment
1. Validiert alle Formulardaten
2. Generiert eindeutige Bestellnummer (z.B. "AROMA-A1B2C3D4")
3. Verarbeitet Zahlung über Stripe oder PayPal
4. Erstellt Bestellungsdatensatz
5. Sendet Bestätigungs-E-Mail
6. Aktualisiert Benutzer-Mitgliedschaft
7. Gibt Erfolgsantwort mit order_id zurück
```

**Erfolgreiche Antwort:**
```json
{
  "success": true,
  "order_id": "AROMA-A1B2C3D4",
  "message": "Zahlung erfolgreich"
}
```

**Weiterleitung:**
- Bei Erfolg: `/membership/thankyou?order_id=AROMA-A1B2C3D4`
- Bei Fehler: Fehlermeldung wird angezeigt, Kunde bleibt auf Zahlungsseite

### 3. Danke-Seite

**URL:** `/membership/thankyou?order_id=AROMA-A1B2C3D4`

**Funktionen:**
- Zeigt Erfolgsmeldung
- Zeigt Bestellnummer
- Listet nächste Schritte:
  1. 📧 E-Mail mit Rechnung und Zugangsdaten wird gesendet
  2. 🔐 Account wird automatisch mit Mitgliedschaftsrechten aktualisiert
  3. 🎉 Kunde kann alle Vorteile nutzen
- Buttons:
  - "Zur Startseite"
  - "Zum Profil"

### 4. E-Mail-Bestätigung

**Automatisch gesendet nach erfolgreichem Kauf**

**Inhalt:**
- Betreff: "Bestellbestätigung - Ihre Aroma Queen Mitgliedschaft"
- Bestellnummer
- Mitgliedschaftstyp
- Zahlungsplan
- Gesamtbetrag
- Rechnungsadresse
- Zahlungsmethode
- Link zum Download der Rechnung (optional)

**E-Mail-Template:**
- Wird über `OrderConfirmationMailer` gesendet
- Template: `order_confirmation`
- Sprache: Deutsch

## Technische Details

### Frontend-Komponenten

1. **Landing Page:**
   - `assets/javascripts/discourse/connectors/above-main-container/aroma-membership-landing.hbs`
   - `assets/javascripts/discourse/connectors/above-main-container/aroma-membership-landing.js`

2. **Zahlungsseite:**
   - `assets/javascripts/discourse/routes/membership-payment.js`
   - `assets/javascripts/discourse/templates/membership-payment.hbs`
   - `assets/javascripts/discourse/controllers/membership-payment.js`

3. **Danke-Seite:**
   - `assets/javascripts/discourse/routes/membership-thankyou.js`
   - `assets/javascripts/discourse/templates/membership-thankyou.hbs`

### Backend-API

**Endpoint:** `POST /aroma-membership/process-payment`

**Request Body:**
```json
{
  "membership_type": "basic",
  "payment_type": "onetime",
  "price": "49.00",
  "payment_method": "stripe",
  "customer": {
    "first_name": "Max",
    "last_name": "Mustermann",
    "email": "max@example.com",
    "phone": "+49 123 456789",
    "address": "Musterstraße 123",
    "postal_code": "12345",
    "city": "Berlin",
    "country": "DE"
  }
}
```

**Response (Erfolg):**
```json
{
  "success": true,
  "order_id": "AROMA-A1B2C3D4",
  "message": "Zahlung erfolgreich"
}
```

**Response (Fehler):**
```json
{
  "success": false,
  "error": "Fehlermeldung"
}
```

### Zahlungsanbieter-Integration

#### Stripe

**Konfiguration:**
- `aroma_membership_stripe_public_key` - Public Key (für Frontend)
- `aroma_membership_stripe_secret_key` - Secret Key (für Backend)

**Implementierung:**
- Aktuell: Placeholder-Implementierung
- TODO: Vollständige Stripe-Integration mit:
  - PaymentIntent erstellen
  - Zahlung bestätigen
  - Webhooks für Zahlungsbestätigung

**Beispiel-Integration:**
```ruby
def process_stripe_payment(price, customer_data)
  Stripe.api_key = SiteSetting.aroma_membership_stripe_secret_key
  
  payment_intent = Stripe::PaymentIntent.create(
    amount: (price.to_f * 100).to_i, # in Cent
    currency: 'eur',
    customer: customer_data[:email],
    metadata: {
      membership_type: params[:membership_type],
      order_id: order_id
    }
  )
  
  { success: true, payment_intent_id: payment_intent.id }
end
```

#### PayPal

**Konfiguration:**
- `aroma_membership_paypal_client_id` - PayPal Client ID

**Implementierung:**
- Aktuell: Placeholder-Implementierung
- TODO: Vollständige PayPal-Integration mit:
  - Order erstellen
  - Zahlung erfassen
  - Webhooks für Zahlungsbestätigung

### Datenbank-Speicherung

**Hinweis:** Aktuell werden Bestellungen nicht in einer Datenbank gespeichert. Für Produktion sollten Sie:

1. Eine `membership_orders` Tabelle erstellen:
```ruby
create_table :membership_orders do |t|
  t.string :order_id, null: false, unique: true
  t.integer :user_id
  t.string :membership_type
  t.string :payment_type
  t.decimal :price, precision: 10, scale: 2
  t.string :payment_method
  t.string :status
  t.json :customer_data
  t.string :transaction_id
  t.timestamps
end
```

2. Bestellungen speichern:
```ruby
order = MembershipOrder.create!(
  order_id: order_id,
  user_id: current_user.id,
  membership_type: params[:membership_type],
  payment_type: params[:payment_type],
  price: params[:price],
  payment_method: params[:payment_method],
  status: 'completed',
  customer_data: customer_data,
  transaction_id: payment_result[:transaction_id]
)
```

### Benutzer-Mitgliedschaft aktualisieren

**Aktuell:** Placeholder-Implementierung

**Empfohlene Implementierung:**

1. **Custom Fields:**
```ruby
def update_user_membership(user, membership_type)
  user.custom_fields['membership_type'] = membership_type
  user.custom_fields['membership_purchased_at'] = Time.now
  user.custom_fields['membership_expires_at'] = 1.year.from_now
  user.save_custom_fields(true)
end
```

2. **Gruppen-Zuweisung:**
```ruby
def update_user_membership(user, membership_type)
  group_name = membership_type == 'premium' ? 'Premium Members' : 'Basic Members'
  group = Group.find_by(name: group_name)
  group.add(user) if group
end
```

## Konfiguration

### Settings aktivieren

1. **Admin → Settings → Plugins**
2. Aktivieren Sie:
   - ✅ `aroma_membership_landing_enabled` - Landing Page anzeigen
   - ✅ `aroma_membership_premium_enabled` - Premium Mitgliedschaft anzeigen (optional)

### Preise konfigurieren

**Basic Account:**
- `aroma_membership_basic_onetime_price`: "49.00"
- `aroma_membership_basic_monthly_price`: "4.49"
- `aroma_membership_basic_features`: Features (eine pro Zeile)

**Premium Account:**
- `aroma_membership_premium_onetime_price`: "99.00"
- `aroma_membership_premium_monthly_price`: "8.99"
- `aroma_membership_premium_features`: Features (eine pro Zeile)

### Zahlungsanbieter konfigurieren

**Stripe:**
- `aroma_membership_stripe_public_key`: Ihr Stripe Public Key
- `aroma_membership_stripe_secret_key`: Ihr Stripe Secret Key

**PayPal:**
- `aroma_membership_paypal_client_id`: Ihr PayPal Client ID

## Beispiel-Zahlungsseite

Die Zahlungsseite zeigt:

```
┌─────────────────────────────────────────────────┐
│        Zahlungsinformationen                    │
│  Bitte füllen Sie das Formular aus...          │
├──────────────────┬──────────────────────────────┤
│ Bestellübersicht│ Persönliche Informationen    │
│                  │                              │
│ Mitgliedschaft:  │ [Vorname*]                  │
│ Basic Account    │ [Nachname*]                  │
│                  │ [E-Mail*]                    │
│ Zahlungsplan:    │ [Telefon]                    │
│ Einmalzahlung    │                              │
│                  │ Rechnungsadresse              │
│ Gesamtbetrag:    │                              │
│ €49.00           │ [Straße*]                     │
│                  │ [PLZ*] [Stadt*]              │
│                  │ [Land*]                       │
│                  │                              │
│                  │ Zahlungsmethode              │
│                  │ ○ Kreditkarte                │
│                  │ ○ PayPal                     │
│                  │                              │
│                  │ [Stripe Card Element]        │
│                  │                              │
│                  │ ☑ AGB akzeptieren            │
│                  │ ☑ Datenschutz akzeptieren    │
│                  │                              │
│                  │ [Kauf abschließen - €49.00]  │
│                  │ [Abbrechen]                  │
└──────────────────┴──────────────────────────────┘
```

## Sicherheit

1. **SSL-Verschlüsselung:** Alle Zahlungen erfolgen über HTTPS
2. **Authentifizierung:** Zahlungen erfordern eingeloggten Benutzer
3. **Validierung:** Alle Formulardaten werden serverseitig validiert
4. **PCI-Compliance:** Kreditkartendaten werden nie auf dem Server gespeichert (Stripe/PayPal)

## Fehlerbehebung

### Zahlungsseite wird nicht angezeigt
1. ✅ `aroma_membership_landing_enabled` aktiviert?
2. ✅ Plugin neu gebaut? (`./launcher rebuild app`)
3. ✅ Browser-Cache geleert?

### Zahlung schlägt fehl
1. ✅ Stripe/PayPal korrekt konfiguriert?
2. ✅ API-Keys korrekt eingegeben?
3. ✅ Server-Logs prüfen für Fehlerdetails

### E-Mail wird nicht gesendet
1. ✅ Discourse E-Mail-Konfiguration korrekt?
2. ✅ Server-Logs prüfen
3. ✅ Spam-Ordner prüfen

## Nächste Schritte

1. **Stripe/PayPal vollständig integrieren**
2. **Datenbank für Bestellungen erstellen**
3. **Benutzer-Mitgliedschaft automatisch aktualisieren**
4. **Webhooks für Zahlungsbestätigung einrichten**
5. **Rechnungen als PDF generieren**
6. **Admin-Interface für Bestellungen**

---

**Entwickelt mit ❤️ für Aroma Queen**

