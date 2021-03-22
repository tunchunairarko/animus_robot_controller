import socketio

sio = socketio.Client()
@sio.event
def connect():
    print('connection established')

@sio.event
def my_message(data):
    print('message received with ', data)
    sio.emit('my response', {'response': 'my response'})

@sio.event
def disconnect():
    print('disconnected from server')

sio.connect('https://995f9b6a2174.ngrok.io')
sio.wait()