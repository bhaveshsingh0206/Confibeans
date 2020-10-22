from flask import Flask, request, jsonify, Response, render_template
from flask_cors import CORS
import json
from collections import OrderedDict
app = Flask(__name__)
CORS(app)
with open('data.json') as f:
    DATA = json.load(f)
print(DATA)
# data = {
#     "DataElement1": {
#         "DataElement11": "DE11-V1",
#         "DataElement12": "DE12-V2",
#         "DataElement13": {
#             "DataElement131": "DE131-V1",
#             "DataElement132": "DE132-V2",
#         },
#     }
# }
# finalData = OrderedDict({
#     "Section1": {
#         "SectionTitle": "Section 1 Title",
#         "Value": "Value 1 children of Section 1",
#         "XubSection1": {
#             "SectionTitle": "SubSection1 Title",
#             "Value": "Value 1 children of ZubSection1"
#         },
#         "YataElement1": {
#             "DataElement11": "DE11-V1",
#             "DataElement12": "DE12-V2",
#             "DataElement13": {
#                 "DataElement131": "DE131-V1",
#                 "DataElement132": "DE132-V2",
#             },
#         },
#         "ZectionEnd": "Section 1 End",
#         "cbd": {
#             "CBClass": "cbSection1"
#         }
#     },
# })
# # print(finalData)
# finalDat = {
#     "Section1": {
#         "SectionTitle": "Getting load through inline cbd",
#         "values": [
#             {
#                 "Caption": "Caption1",
#                 "Value": "Value1"
#             },
#             {
#                 "Caption": "Caption2",
#                 "Value": "Value2"
#             }
#         ],
#         "cbd": {
#             "CBClass": "cbSection1"
#         }
#     },
#     "Section2": {
#         "SectionTitle": "Getting load through default classes",
#         "values": [
#             {
#                 "Caption": "Caption1",
#                 "Value1": "Value1",
#                 "Value2": "Value2"
#             },
#             {
#                 "Caption": "Caption2",
#                 "Value": "Value2"
#             }
#         ],
#         "cbd": {
#             "cbname": "cbSection2"
#         }
#     },
#     "Section3": {
#         "SectionTitle": "Getting load through CBClassofNode",
#         "values": [
#             {
#                 "Caption": "Caption1",
#                 "Value": "Value1"
#             },
#             {
#                 "Caption": "Caption2",
#                 "Value": "Value2"
#             }
#         ],
#         "cbd": {
#             "cbname": "cbSection3"
#         }
#     },
#     "Section4": {
#         "SectionTitle": "Getting load through CBTypeofNode",
#         "values": [
#             {
#                 "Caption": "Caption1",
#                 "Value": "Value1"
#             },
#             {
#                 "Caption": "Caption2",
#                 "Value": "Value2"
#             }
#         ]
#     }
# }
with open('test.cbd') as f:
    x = f.read()
    cb = json.loads(x)
    # print(cb)
# confibean1DATA = {
#     "success": True,
#     "jsFile": "confibean1",
#     "data": [
#         {
#             "Title": "1st Example",
#             "Description": "Demo testing app"
#         },
#         {
#             "Title": "2nd Example",
#             "Description": "Demo testing app"
#         },
#         {
#             "Title": "3rd Example",
#             "Description": "Demo testing app"
#         },
#         {
#             "Title": "4th Example",
#             "Description": "Demo testing app"
#         }
#     ]
# }
# confibean2DATA = {
#     "success": True,
#     "data": {
#         "header":
#             ["Sr. No", "Name", "Percentage", "Grade"],
#         "body": [
#             {
#                 "Sr. No": "1",
#                 "Name": "Bhavesh",
#                 "Percentage": "99%",
#                 "Grade": "A+"
#             },
#             {
#                 "Sr. No": "2",
#                 "Name": "Ali",
#                 "Percentage": "58%",
#                 "Grade": "F-"
#             },
#             {
#                 "Sr. No": "3",
#                 "Name": "Batman",
#                 "Percentage": "88%",
#                 "Grade": "A-"
#             },
#             {
#                 "Sr. No": "4",
#                 "Name": "Rahil",
#                 "Percentage": "70%",
#                 "Grade": "C+"
#             },
#             {
#                 "Sr. No": "5",
#                 "Name": "kmkc",
#                 "Percentage": "58%",
#                 "Grade": "F-"
#             },
#             {
#                 "Sr. No": "6",
#                 "Name": "MNln",
#                 "Percentage": "58%",
#                 "Grade": "F-"
#             },
#             {
#                 "Sr. No": "7",
#                 "Name": "AJNJNli",
#                 "Percentage": "58%",
#                 "Grade": "F-"
#             },
#             {
#                 "Sr. No": "8",
#                 "Name": "AKLOL",
#                 "Percentage": "58%",
#                 "Grade": "F-"
#             },

#             ]
#     },
#     "jsFile": "confibean2"
# }
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
