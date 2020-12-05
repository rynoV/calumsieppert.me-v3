---
title: "Windows Audio"
date: "<2020-12-05 Sat>"
---

I was having an issue where the "Windows Audio Device Graph Isolation" process was taking up too much CPU and causing my fan to spin up everytime I was in a video conference (Zoom and Google Meet specifically). All of the guides online mentioned disabling audio enhancements in the "Enhancements" of the audio device after going to the sound settings in the control panel. I didn't have this tab for my audio devices though, so what fixed this issue for me was going to the properties of my microphone device under the "Recording" tab of those sound settings, then going to the "Advanced" tab and unchecking the "Enable audio enhancements" check box. What confused me at first was that there was no effect after clicking this checkbox in my *speaker* device, but the issue was actually in the *microphone* device.
