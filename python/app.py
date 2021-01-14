from flask import Flask, jsonify, request, render_template
import serial
app = Flask(__name__)
from flask_cors import CORS
CORS(app)
ser1 = serial.Serial('COM3', 9600)


lighton = False

@app.route('/toggle', methods=['GET', 'POST'])
def hello():
    global lighton
    # POST request
    if request.method == 'POST':
        print('Incoming..')
        print(request.get_json())  # parse as JSON
        return 'OK', 200

    # GET request
    else:
        if lighton==False:
            response = jsonify({"light": True})
            ser1.write('a'.encode())
            lighton  = True
            print(lighton)
        elif lighton==True:
            response = jsonify({"light": False})
            ser1.write('z'.encode())
            lighton = False
            print(lighton)
        else:
            response = jsonify({"light":"error"})

        response.headers.add('Access-Control-Allow-Origin', '*')
        return response





if __name__ == '__main__':
    app.run(host='192.168.2.2')