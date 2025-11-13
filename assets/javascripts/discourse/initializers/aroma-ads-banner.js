import { withPluginApi } from "discourse/lib/plugin-api";

function hideNameField() {
  // Find the name input field
  const nameInput = document.querySelector('.create-account input[name="name"], .create-account-body input[name="name"]');
  if (nameInput) {
    // Hide the input field
    nameInput.style.display = 'none';
    nameInput.setAttribute('aria-hidden', 'true');
    
    // Find and hide the parent container
    const formGroup = nameInput.closest('.input-group, .form-group, .control-group, .d-input, .d-field');
    if (formGroup) {
      formGroup.style.display = 'none';
    }
    
    // Find and hide the label
    const label = document.querySelector('label[for="' + nameInput.id + '"]') || 
                  nameInput.previousElementSibling?.tagName === 'LABEL' ? nameInput.previousElementSibling : null;
    if (label) {
      label.style.display = 'none';
    }
    
    // Also try to find label by text content
    const labels = document.querySelectorAll('.create-account label, .create-account-body label');
    labels.forEach(lbl => {
      const text = lbl.textContent.toLowerCase().trim();
      if ((text.includes('full name') || text === 'name' || text.includes('your full name')) && 
          !text.includes('first') && !text.includes('last') && !text.includes('username')) {
        const associatedInput = document.getElementById(lbl.getAttribute('for')) || 
                                lbl.nextElementSibling?.querySelector('input[name="name"]');
        if (associatedInput === nameInput || associatedInput?.name === 'name') {
          lbl.style.display = 'none';
          const parent = lbl.closest('.input-group, .form-group, .control-group, .d-input, .d-field');
          if (parent) {
            parent.style.display = 'none';
          }
        }
      }
    });
  }
}

function setupNameFieldAutoGeneration() {
  const form = document.querySelector('.create-account form, .create-account-body form');
  if (form && !form.dataset.nameAutoGenSetup) {
    form.dataset.nameAutoGenSetup = 'true';
    
    form.addEventListener('submit', function(e) {
      const firstNameInput = document.querySelector('.create-account input[name="first_name"], .create-account-body input[name="first_name"]');
      const lastNameInput = document.querySelector('.create-account input[name="last_name"], .create-account-body input[name="last_name"]');
      const nameInput = document.querySelector('.create-account input[name="name"], .create-account-body input[name="name"]');
      
      if (nameInput) {
        if (firstNameInput && lastNameInput) {
          const firstName = firstNameInput.value.trim();
          const lastName = lastNameInput.value.trim();
          if (firstName && lastName) {
            nameInput.value = `${firstName} ${lastName}`;
          } else if (firstName) {
            nameInput.value = firstName;
          } else if (lastName) {
            nameInput.value = lastName;
          }
        } else if (firstNameInput) {
          nameInput.value = firstNameInput.value.trim();
        } else if (lastNameInput) {
          nameInput.value = lastNameInput.value.trim();
        }
      }
    });
  }
}

function initializeAromaAdsBanner(api) {
  // Plugin now uses modern connectors instead of deprecated widget decorators
  // All ad placements are handled via plugin outlets in the connectors directory
  
  // Hide the "Name" field from registration form and auto-generate from first/last name
  api.modifyClass("component:create-account", {
    didInsertElement() {
      this._super(...arguments);
      setTimeout(() => {
        hideNameField();
        setupNameFieldAutoGeneration();
      }, 100);
    },
    
    didUpdate() {
      this._super(...arguments);
      setTimeout(() => {
        hideNameField();
        setupNameFieldAutoGeneration();
      }, 100);
    }
  });
  
  // Also use mutation observer as a fallback
  if (typeof window !== 'undefined') {
    const observer = new MutationObserver(() => {
      if (document.querySelector('.create-account, .create-account-body')) {
        hideNameField();
        setupNameFieldAutoGeneration();
      }
    });
    
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    
    // Initial check
    setTimeout(() => {
      hideNameField();
      setupNameFieldAutoGeneration();
    }, 500);
  }
}

// German setting name translations
const GERMAN_SETTING_NAMES = {
  "aroma_ads_banner_enabled": "Aroma Queen Werbebanner Plugin aktivieren",
  "aroma_ads_hide_for_staff": "Werbung für Mitarbeiter ausblenden", 
  "aroma_ads_hide_for_trust_level": "Werbung für Benutzer mit Vertrauensstufe gleich oder höher ausblenden (0 = allen anzeigen)",
  "aroma_ads_after_header_enabled": "Banner nach Site-Header anzeigen",
  "aroma_ads_after_header_html": "HTML-Inhalt für Banner nach Header",
  "aroma_ads_after_first_post_enabled": "Banner nach dem ersten Beitrag in Themen anzeigen",
  "aroma_ads_after_first_post_html": "HTML-Inhalt für Banner nach erstem Beitrag",
  "aroma_ads_after_nth_post_enabled": "Banner nach jedem N-ten Beitrag anzeigen",
  "aroma_ads_after_nth_post_number": "Anzahl der Beiträge zwischen Bannern",
  "aroma_ads_after_nth_post_html": "HTML-Inhalt für Banner nach N-tem Beitrag",
  "aroma_ads_sidebar_enabled": "Banner in der Seitenleiste anzeigen",
  "aroma_ads_sidebar_html": "HTML-Inhalt für Seitenleisten-Banner",
  "aroma_ads_before_footer_enabled": "Banner vor Footer anzeigen",
  "aroma_ads_before_footer_html": "HTML-Inhalt für Banner vor Footer",
  "aroma_ads_topic_list_top_enabled": "Banner oben in Themenlisten anzeigen",
  "aroma_ads_topic_list_top_html": "HTML-Inhalt für Banner oben in Themenliste",
  "aroma_ads_mobile_banner_enabled": "Mobilspezifisches Banner anzeigen",
  "aroma_ads_mobile_banner_html": "HTML-Inhalt für Mobil-Banner"
};

function translateSettingNames() {
  // Check if we're in admin settings page
  if (window.location.pathname.includes('/admin/site_settings/plugins/')) {
    // Wait for settings to load
    setTimeout(() => {
      // Find all setting name elements and translate them
      Object.keys(GERMAN_SETTING_NAMES).forEach(settingName => {
        const elements = document.querySelectorAll(`[data-setting-name="${settingName}"]`);
        elements.forEach(element => {
          const nameElement = element.querySelector('.setting-name, .setting-label');
          if (nameElement && GERMAN_SETTING_NAMES[settingName]) {
            nameElement.textContent = GERMAN_SETTING_NAMES[settingName];
          }
        });
      });
    }, 1000);
  }
}

export default {
  name: "aroma-ads-banner",
  
  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    
    if (siteSettings.aroma_ads_banner_enabled) {
      withPluginApi("0.11.0", initializeAromaAdsBanner);
    }
    
    // Translate setting names on admin page
    translateSettingNames();
    
    // Also translate when navigating to settings
    document.addEventListener('DOMContentLoaded', translateSettingNames);
  }
};




