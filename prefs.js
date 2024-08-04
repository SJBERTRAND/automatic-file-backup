import Gio from 'gi://Gio';
import Adw from 'gi://Adw';
import Gtk from 'gi://Gtk';
import GLib from 'gi://GLib';

import {ExtensionPreferences, gettext as _} from 'resource:///org/gnome/Shell/Extensions/js/extensions/prefs.js';

export default class AutomaticFileBackupPreferences extends ExtensionPreferences {
    fillPreferencesWindow(window) {
        // Create a preferences page, with a single group
        const page = new Adw.PreferencesPage({
            title: _('General'),
            icon_name: 'dialog-information-symbolic',
        });
        window.add(page);

        const group = new Adw.PreferencesGroup({
            title: _('Automatic File/Folder backup via rsync'),
            description: _('Connection can be done via SSH or rsync daemon'),
        });
        page.add(group);
        
        //Create new rows for the settings
        
        
        
          // Import the settings
        const _settings = this.getSettings();
      
       // Create a settings object and bind the settings keys
      
      
      
    };
};
