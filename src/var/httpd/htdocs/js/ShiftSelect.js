// --
// Copyright (C) 2026 Katla, https://github.com/hollowRevival/ShiftSelect
// --
// This software comes with ABSOLUTELY NO WARRANTY. For details, see
// the enclosed file COPYING for license information (GPL). If you
// did not receive this file, see https://www.gnu.org/licenses/gpl-3.0.txt.
// --

(function ($) {
    'use strict';

    var LastChecked = null;

    // Capture phase on purpose: Core.UI.ActionRow binds a handler directly on
    // every checkbox that calls stopPropagation(), so a delegated bubble-phase
    // listener never sees the click.
    document.addEventListener('click', function (Event) {
        var Checkbox = Event.target,
            Checkboxes,
            Start,
            End,
            Checked;

        if (!Checkbox || Checkbox.tagName !== 'INPUT' || Checkbox.type !== 'checkbox' || Checkbox.name !== 'TicketID') {
            return;
        }

        if (Event.shiftKey && LastChecked && LastChecked.isConnected && LastChecked !== Checkbox) {
            Checkboxes = $(Checkbox).closest('.Overview').find('input[type="checkbox"][name="TicketID"]').toArray();
            Start = Checkboxes.indexOf(LastChecked);
            End = Checkboxes.indexOf(Checkbox);
            Checked = Checkbox.checked;

            if (Start > -1 && End > -1) {
                Checkboxes.slice(Math.min(Start, End), Math.max(Start, End) + 1).forEach(function (Other) {
                    if (Other !== Checkbox && Other.checked !== Checked) {
                        // Same pattern as core's SelectAllTickets, so the action row
                        // and bulk action toolbar update as for a normal click.
                        $(Other).prop('checked', Checked).triggerHandler('click');
                    }
                });
            }
        }

        LastChecked = Checkbox;
    }, true);

}(jQuery));
