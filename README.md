# Weather-Forecast-Dashboard
Read the Wiki: ![https://github.com/vlaine/Weather-Forecast-Dashboard/wiki](https://github.com/vlaine/Weather-Forecast-Dashboard/wiki)

## Weather Forecast Dashboard written in jquery and html.
This is the most complete and versatile weather forecast dashboard.  It is also very lightweight.
- Optional scrolling alerts
- Configurable daily forecast (0 [hidden] to 8 days)
- Configurable hourly forecast (0 [hidden] to 49 hours)
- Multiple units available (ca, uk2, us, si)

## Steps:
- Download the source
- Edit the config.js file
- Launch index.html in your favorite browser

***
## Kitchen countertop project
I installed the weather forecast dashboard on a Raspberry Pi W and mounted it behind a 7" display
![Raspberry Pi Zero W with a 7in Screen](https://github.com/vlaine/Weather-Forecast-Dashboard/blob/master/screehshots/Raspberry%20Pi%20Zero%20W%20with%20a%207in%20Screen.JPG?raw=true)

***

## Tips for Raspberry Pi below

### Tip 1: Disable screen saver.

sudo apt-get update
sudo apt-get install unclutter
sudo apt-get install xscreensaver
use the xscreensaver gui to disable the screen saver

### Tip 2: Run chromium in full screen

chromium-browser --incognito --kiosk {pathToYour_index.html_file}
example: chromium-browser --incognito --kiosk file:///boot/WeatherForecastDashboard/index.html

### Tip 3: Autostart and boot directly to WeatherForecastDashboard

sudo mkdir -p /home/pi/.config/lxsession/LXDE-pi
sudo cp /etc/xdg/lxsession/LXDE-pi/autostart /home/pi/.config/lxsession/LXDE-pi/
sudo nano /home/pi/.config/lxsession/LXDE-pi/autostart

add these lines to the autostart file:
@chromium-browser --incognito --kiosk {pathToYour_index.html_file}
@unclutter -idle 0.1 -root

sudo reboot

### Tip 4: To quit chromium 
When it is in kiosk mode, press the command key to show the start menu

## Forecast With Alerts
![Forecast With Alerts](https://github.com/vlaine/Weather-Forecast-Dashboard/blob/master/screehshots/600x1024_1.jpg?raw=true)

## Imperial
![Imperial](https://github.com/vlaine/Weather-Forecast-Dashboard/blob/master/screehshots/imperial.jpg?raw=true)
