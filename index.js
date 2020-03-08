/**
 * MIT License
 *
 * Copyright (c) 2020 Mrakovic
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
console.clear();
console.warn('%cWelcome to Tesla\'s Cracked.to script, to enable script please press CTRL+0', 'background: linear-gradient(red, blue, white);font-size: 15px;line-height: 2;');

var items = document.getElementsByClassName('entry '),
    script_enabled = false,
    emoji = [':kappa:', ':jew:', ':sadnigga:', ':santarun:', ':clown2:', ':conceited:', ':keek:', ':pepeglad:', ':sheepe:', ':hyperneko:', ':kiss1:', ':ricardo:', ':mesvak:', ':am1nolbroken:', ':pepemusic:', ':kingpepo:', ':am1nol:', ':ksz:', ':florain:', ':dancinggirl:', ':feelsabdulman:', ':poggershype:', ':MLGpepe:', ':pogchamppepe:', ':ban:', ':thinkingpepe:', ':klappa:'];

document.body.addEventListener('keydown', function (k) {
  if (k.ctrlKey && k.key === '0') {
    console.warn('Initialized script startup.');
    var confirmation = prompt('Are you willing to enable script?', 'yes');

    if (confirmation === 'yes') {
      console.warn('Script successfully enabled !\n\nOptions available:\nCTRL+ALT+1: Custom message purger\nCTRL+ALT+2: Custom message changer\nCTRL+ALT+3: Custom message spammer\nCTRL+ALT+4: Funny message mode');
      script_enabled = true;
    }

    if (confirmation === null || confirmation === 'no') {
      console.warn('Script disabled.');
      script_enabled = false;
    }
  }

  if (script_enabled === true) {
    var i = 0,
        count = 0;

    if (k.altKey && k.ctrlKey && k.key === '1') {
      console.warn('Initialized custom message purger.');

      if (!Shoutbox.permissions.mod_own) {
        return console.warn('You dont have permissions to edit/remove your own messages.');
      }

      var num_to_del = prompt('How many messages you want to purge?', '2');

      if (num_to_del === null) {
        return console.warn('User exited from prompt.');
      }

      for (i; i < items.length; ++i) {
        if (items[i]['dataset']['user'] == Shoutbox.userId) {
          if (count > num_to_del - 1) {
            break;
          }

          console.warn('Deleted: %c' + items[i]['children'][1]['innerText'] + '%c: "%c' + items[i]['children'][2]['innerText'] + '%c" (%c' + items[i]['dataset']['id'] + '%c)', 'color: white;', '', 'color: #AAA;', '', 'color: red;', '');
          Shoutbox.emit(0x04, {
            id: items[i]['dataset']['id'],
            message: ':kappa:'
          });
          Shoutbox.emit(0x03, items[i]['dataset']['id']);
          items[i].innerHTML = ''; //Remove the content before it starts to fade out and cause lag.

          ++count;
        }
      }

      console.warn('Purge done, total messages removed: ' + count);
    }

    if (k.altKey && k.ctrlKey && k.key === '2') {
      console.warn('Initialized custom message changer.');

      if (!Shoutbox.permissions.mod_own) {
        return console.warn('You dont have permissions to edit/remove your own messages.');
      }

      var question = prompt('How much message to change?', '2'),
          replacement = prompt('What you want it to be replaced with?', ':kappa:');

      if (question === null || replacement === null) {
        return console.warn('User exited from prompt.');
      }

      for (i; i < items.length; ++i) {
        if (items[i]['dataset']['user'] == Shoutbox.userId) {
          if (count > question - 1) {
            break;
          }

          Shoutbox.emit(0x04, {
            id: items[i]['dataset']['id'],
            message: replacement
          });
          ++count;
        }
      }

      console.warn('Changes done, total messages changed: ' + count);
    }

    if (k.altKey && k.ctrlKey && k.key === '3') {
      console.warn('Initialized custom messager.');
      var msg = prompt('Enter the message to send:', ':kappa:'),
          msg_num = prompt('Enter number of times to send message:', '2');

      if (msg === null || msg_num === null) {
        return console.warn('User exited from prompt.');
      }

      var int = setInterval(function () {
        Shoutbox.emit(0x02, {
          message: msg,
          room: Shoutbox.userRoom
        });
        ++count;

        if (count >= msg_num) {
          clearInterval(int);
          console.warn('Sending done, total messages sent: ' + count);
        }
      }, 1100);
    }

    if (k.altKey && k.ctrlKey && k.key === '4') {
      console.warn('Initialized funny messager.');
      var mode = prompt('Options available:\n1: Make <code> every 2 char\n2: Make bold every 2 char\n3: Replace space with random emoji\n4: All in one (code,bold,emoji)', ''),
          msg_m = prompt('Message to send:', '');

      if (mode === null || msg_m === null) {
        return console.warn('User exited from prompt.');
      }

      var f_msg = '';

      if (mode === '1' || mode === '2') {
        for (i; i < Array.from(msg_m).length; ++i) {
          if (i % 2) {
            if (Array.from(msg_m)[i] === ' ') {
              f_msg += Array.from(msg_m)[i];
              continue;
            }

            if (mode === '1') {
              f_msg += '`' + Array.from(msg_m)[i] + '`';
            }

            if (mode === '2') {
              f_msg += '**' + Array.from(msg_m)[i] + '**';
            }

            continue;
          }

          f_msg += Array.from(msg_m)[i];
        }
      }

      if (mode === '3') {
        for (i; i < Array.from(msg_m).length; ++i) {
          if (Array.from(msg_m)[i] === ' ') {
            f_msg += emoji[Math.floor(Math.random() * emoji.length)];
            continue;
          }

          f_msg += Array.from(msg_m)[i];
        }
      }

      if (mode === '4') {
        for (i; i < Array.from(msg_m).length; ++i) {
          if (Array.from(msg_m)[i] === ' ') {
            f_msg += emoji[Math.floor(Math.random() * emoji.length)];
            continue;
          }

          if (i % 2) {
            f_msg += '`' + Array.from(msg_m)[i] + '`';
            continue;
          }

          f_msg += '**' + Array.from(msg_m)[i] + '**';
        }
      }

      Shoutbox.emit(0x02, {
        message: f_msg,
        room: Shoutbox.userRoom
      });
    }
  }
});
