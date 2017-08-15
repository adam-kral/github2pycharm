# github2pycharm
__Lets you `cmd+click` or `ctrl+click` on a line and see it in PyCharm.__

### Installation

#### Browser extension (part 1)
Browser extension is located in `extension` folder.

##### Firefox [web instructions](https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Temporary_Installation_in_Firefox)
 - Enter `about:debugging` in the URL bar.
 - Click "Load Temporary Add-on".
 - In the popped-up file browser, select either the manifest or js file of this extension.
 
##### Chrome [web instructions](https://developer.chrome.com/extensions/getstarted#unpacked)
 - Visit `chrome://extensions` in your browser.
 - Ensure that the Developer mode checkbox in the top right-hand corner is checked.
 - Click Load unpacked extension… to pop up a file-selection dialog.
 - Navigate to the directory in which your extension files live, and select it.

Alternatively, you can drag and drop the directory where your extension files live onto chrome://extensions in your browser to load it.

#### Local server  (part 2)
1) Ensure you have Python 3 and Flask (`pip install flask` or `pip3` depending on your setup) installed.
2) Navigate to the package `github2pycharm` (direct parent of `server.py`).
3) Run

    ```shell
    export FLASK_APP=server.py
    python3 -m flask run -p 50007
    ```
    (on Windows substitute `set` for `export`) 

### Configuration
Just copy the `settings.py.sample` as `settings.py`, set path to PyCharm executable and map Github repository names with repository paths on your machine. 


### Comments
*The port number is hardcoded in the extension*

*todo - create `setup.py`, but what about the configuration files?*
