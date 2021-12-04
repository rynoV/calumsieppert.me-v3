#!/bin/bash
# Run this to fix permissions on all repo files if they get messed up after a
# failed Docker build or something
sudo chgrp -R calum .
sudo chmod -R g+rwX .
find . -type d -exec chmod g+s '{}' +