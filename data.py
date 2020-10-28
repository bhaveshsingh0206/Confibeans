from flask import Flask, request, jsonify, Response, render_template
from flask_cors import CORS
import json
from collections import OrderedDict
app = Flask(__name__)
CORS(app)
with open('data.json') as f:
    DATA = json.load(f)
print(DATA)

with open('test.cbd') as f:
    x = f.read()
    cb = json.loads(x)

@app.route('/', methods=['GET'])
def renderHome():
    return render_template('base.html')


@app.route('/api/getJson', methods=['POST'])
def getData():
    with open('jcb.json') as g:
        jcb = json.load(g)
        dataType = request.get_json(force=True)['type']
        print(dataType)
        # if dataType == "PLTable":
        #     msg = confibean2DATA
        # elif dataType == "data3":
        #     msg = confibean3DATA
        # elif dataType == "sample":
        #     msg = finalData
        # else:
        #     msg = confibean1DATA
        response = OrderedDict({
            "success": True,
            "data": DATA,
            "cb": cb
        })
        print(response)
        return response


@app.route('/api/receiveJson', methods=['POST'])
def receiveJson():
    data = request.get_json(force=True)['data']
    with open('data.json', 'w') as f:
        json.dump(data, f, indent=3)

    response = {
        "success": True
    }
    return response


if __name__ == "__main__":
    app.run(debug=True)
