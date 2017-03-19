# Weather-Forecast-Dashboard
Weather Forecast Dashboard written in jquery and html.

Steps:
- Download the source
- Edit the config.js file
- Launch index.html in your favorite browser

*************************************************************************************************
Tips for Raspberry Pi below
*************************************************************************************************

Tip 1: Disable screen saver.

sudo apt-get update
sudo apt-get install xscreensaver
use the xscreensaver gui to disable the screen saver

*************************************************************************************************

Tip 2: Run chromium in full screen

chromium-browser --incognito --kiosk {pathToYour_index.html_file}
exemple: chromium-browser --incognito --kiosk file:///boot/WeatherForecastDashboard/index.html

*************************************************************************************************

Tip 3: Autostart and boot directly to WeatherForecastDashboard

sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart

add this line to the autostart file:
@chromium-browser --incognito --kiosk {pathToYour_index.html_file}

sudo reboot

*************************************************************************************************

Tip 4: To quit chromium when it is in kiosk mode, press the command key to show the start menu

*************************************************************************************************
