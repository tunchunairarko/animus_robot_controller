import random
import time
import sys
import json
import animus_client as animus
import animus_utils as utils
import sys
import logging
import numpy as np
import random
import cv2
import time
import socketio
import base64


sio = socketio.Client()

myrobot=None

@sio.event
def connect():
    print('connected to server')


@sio.event
def disconnect():
    print('disconnected from server')

@sio.on('frontenddata')
def frontenddata(data):
    key=data['key']
    value=data['value']

    motorDict = utils.get_motor_dict()
    list_of_motions = [motorDict.copy()]
    motorDict[key]=value
    list_of_motions.append(motorDict.copy())
    for motion_counter in len(range(list_of_motions)):
        ret = myrobot.set_modality("motor", list(list_of_motions[motion_counter].values()))


def gen_frames(camera):  # generate frame by frame from camera
    while True:
        # Capture frame-by-frame
        success, frame = camera.read()  # read the camera frame
        if not success:
            break
        else:
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            return (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')  # concat frame one by one and show result
def main():
    toggleState=sys.argv[1]
    email = sys.argv[2]
    password = sys.argv[3]
    stopFlag = False
    # print(password)
    if(toggleState==1 or toggleState=='1'):
        print('success')
        sio.connect('http://localhost:5000')
        
        # if(sio.id is not None):
        cam = cv2.VideoCapture(0)
        
        while (True):
            ret, frame = cam.read()                     # get frame from webcam
            encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 60]
            res, frame = cv2.imencode('.jpg', frame)    # from image to binary buffer
            data = base64.b64encode(frame)              # convert to base64 format
            sio.emit('pythondata', data)                      # send to server
            # data=gen_frames(cam)
            # # print(data)
            # sio.emit('pythondata', data)
        
        
        
        
        # log = utils.create_logger("MyAnimusApp", logging.INFO)
        # log.info(animus.version())
        
        # audio_params = utils.AudioParams(
        #             Backends=["notinternal"],
        #             SampleRate=16000,
        #             Channels=1,
        #             SizeInFrames=True,
        #             TransmitRate=30
        #         )

        # setup_result = animus.setup(audio_params, "PythonAnimusBasics", True)
        # if not setup_result.success:
        #     sys.exit(-1)

        # login_result = animus.login_user("ms414@hw.ac.uk", "C3):]RR[Rs$Y", True)
        # if login_result.success:
        #     log.info("Logged in")
        # else:
        #     sys.exit(-1)

        # get_robots_result = animus.get_robots(True, True, True)
        
        # if not get_robots_result.localSearchError.success:
        #     log.error(get_robots_result.localSearchError.description)

        # if not get_robots_result.remoteSearchError.success:
        #     log.error(get_robots_result.remoteSearchError.description)

        # if len(get_robots_result.robots) == 0:
        #     log.info("No Robots found")
        #     print("No Robots found")
        #     animus.close_client_interface()
        #     sys.exit(-1)

        # chosen_robot_details = get_robots_result.robots[0]

        # myrobot = animus.Robot(chosen_robot_details)
        # connected_result = myrobot.connect()
        # if not connected_result.success:
        #     print("Could not connect with robot {}".format(myrobot.robot_details.robot_id))
        #     animus.close_client_interface()
        #     sys.exit(-1)

        # open_success = myrobot.open_modality("vision")
        # if not open_success:
        #     log.error("Could not open robot vision modality")
        #     sys.exit(-1)

        # open_success = myrobot.open_modality("motor")
        # if not open_success:
        #     log.error("Could not open robot motor modality")
        #     sys.exit(-1)

        # sio.connect('http://localhost:5000')
        # sio.wait()
    # while(1):
    #     ra=random.randint(0,100)
    #     data={
    #         'val':ra
    #     }
    #     print(ra)
    #     time.sleep(0.05)


if __name__=='__main__':
    main()


##!/usr/bin/env python3
# -*- coding: utf-8 -*-
# Copyright (c) 2020, Cyberselves Universal Ltd.
# All Rights Reserved


# import animus_client as animus
# import animus_utils as utils
# import sys
# import logging
# import numpy as np
# import random
# import cv2
# import time

# stopFlag = False

# log = utils.create_logger("MyAnimusApp", logging.INFO)
# log.info(animus.version())
# print(animus.version())
# audio_params = utils.AudioParams(
#             Backends=["notinternal"],
#             SampleRate=16000,
#             Channels=1,
#             SizeInFrames=True,
#             TransmitRate=30
#         )

# setup_result = animus.setup(audio_params, "PythonAnimusBasics", True)
# if not setup_result.success:
#     sys.exit(-1)

# login_result = animus.login_user("ms414@hw.ac.uk", "C3):]RR[Rs$Y", True)
# if login_result.success:
#     log.info("Logged in")
# else:
#     sys.exit(-1)

# get_robots_result = animus.get_robots(True, True, True)
# print(get_robots_result)
# if not get_robots_result.localSearchError.success:
#     log.error(get_robots_result.localSearchError.description)

# if not get_robots_result.remoteSearchError.success:
#     log.error(get_robots_result.remoteSearchError.description)

# if len(get_robots_result.robots) == 0:
#     log.info("No Robots found")
#     animus.close_client_interface()
#     sys.exit(-1)

# chosen_robot_details = get_robots_result.robots[0]

# myrobot = animus.Robot(chosen_robot_details)
# connected_result = myrobot.connect()
# if not connected_result.success:
#     print("Could not connect with robot {}".format(myrobot.robot_details.robot_id))
#     animus.close_client_interface()
#     sys.exit(-1)


# # -------------Auditory - Voice Loop------------------------
# #
# # # ----------------Motor Visual Loop------------------------------------
# open_success = myrobot.open_modality("vision")
# if not open_success:
#     log.error("Could not open robot vision modality")
#     sys.exit(-1)

# open_success = myrobot.open_modality("motor")
# if not open_success:
#     log.error("Could not open robot motor modality")
#     sys.exit(-1)

# open_success = myrobot.open_modality("proprioception")
# if not open_success:
#     log.error("Could not open robot speech modality")
#     sys.exit(-1)


# motorDict = utils.get_motor_dict()
# list_of_motions = [motorDict.copy()]

# motorDict["head_left_right"] = 2 * utils.HEAD_RIGHT
# motorDict["head_up_down"] = 2 * utils.HEAD_UP
# motorDict["head_roll"] = 0.0
# motorDict["body_forward"] = 100.0
# motorDict["body_sideways"] = 0.0
# motorDict["body_rotate"] = 0.0
# list_of_motions.append(motorDict.copy())

# motorDict["head_left_right"] = 2 * utils.HEAD_LEFT
# list_of_motions.append(motorDict.copy())

# motorDict["head_up_down"] = 2 * utils.HEAD_DOWN
# list_of_motions.append(motorDict.copy())

# counter = 0
# motion_counter = 0


# cv2.namedWindow("RobotView")
# try:
#     while True:
#         image_list, err = myrobot.get_modality("vision", True)
#         if err.success:
#             cv2.imshow("RobotView", image_list[0].image)
#             j = cv2.waitKey(1)
#             if j == 27:
#                 break

#             counter += 1

#             if counter > 100:
#                 counter = 0
#                 if motion_counter >= len(list_of_motions):
#                     motion_counter = 0
#                 ret = myrobot.set_modality("motor", list(list_of_motions[motion_counter].values()))
#                 motion_counter += 1

# except KeyboardInterrupt:
#     cv2.destroyAllWindows()
#     log.info("Closing down")
#     stopFlag = True
# except SystemExit:
#     cv2.destroyAllWindows()
#     log.info("Closing down")
#     stopFlag = True

# cv2.destroyAllWindows()
# if stopFlag:
#     myrobot.disconnect()
#     animus.close_client_interface()
#     sys.exit(-1)

# # ---------------------------Emotive speech--------------------------
# # open_success = myrobot.open_modality("speech")
# # if not open_success:
# #     log.error("Could not open robot speech modality")
# #     sys.exit(-1)
# #
# # open_success = myrobot.open_modality("emotion")
# # if not open_success:
# #     log.error("Could not open robot emotion modality")
# #     sys.exit(-1)
# #
# # log.info(utils.emotions_list)
# #
# # # Uncomment to send things for the robot to say
# # try:
# #     while True:
# #         msg = input("Robot say: ")
# #         myrobot.set_modality("speech", msg)
# #         myrobot.set_modality("emotion", random.choice(utils.emotions_list))
# # except KeyboardInterrupt:
# #     log.info("Closing down")
# # except SystemExit:
# #     log.info("Closing down")


# myrobot.disconnect()
# animus.close_client_interface()