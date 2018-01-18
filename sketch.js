//serial communication
var serial;

//interfaceElements

//InterfaceVideo
let vidStart;
let vidSayHello;
let vidIamListening;
let vidWhatsYourName;
let vidTreeIntro;
let vidRecording;
let vidUploading;
let vidEmail;

//Interface Buttons
let buttonStart; //Start the process
let buttonNext1; //
let buttonSubmitName; //Submit user's name
let buttonRecord; // Start to record
let buttonStop; // Stop recording
let buttonUpload; // Upload animation
let buttonNext2;
let SubmitInformation; // SubmitInformation and return to first state


//Interface Input
let InputName;
let InputEmail;

let userName

//voice recognition
let url = 'https://api.mlab.com/api/1/databases/timecapsuletree/collections/worries?apiKey=14kAyAdferbHLiBeRXCOjBK0147pWlVA';
let counter = 0;
let buttonclicked = false;
let index = [];
let foo;
let lang;

let Hello;


function setup() {
  createCanvas(1280, 800);


  //Serial Communication
  serial = new p5.SerialPort(); // make a new instance of  serialport librar
  // serial.on('data', serialEvent); // callback for new data coming in
  serial.open("/dev/cu.usbmodem1421"); // open a port

  vidStart = createVideo("1_ClickToStart.mp4");
  vidStart.size(1280, 800);
  vidStart.position(0, 0)
  vidStart.loop();

  vidSayHello = createVideo("2_SayHello.mp4 ");
  vidSayHello.size(1280, 800);
  vidSayHello.position(0, 0)
  vidSayHello.hide();

  vidIamListening = createVideo("3_IAmListening.mp4");
  vidIamListening.size(1280, 800);
  vidIamListening.position(0, 0)
  vidIamListening.hide();

  vidWhatsYourName = createVideo("4_WhatsYourName.mp4");
  vidWhatsYourName.size(1280, 800);
  vidWhatsYourName.position(0, 0)
  vidWhatsYourName.hide();

  vidTreeIntro = createVideo("5_TreeIntro.mp4");
  vidTreeIntro.size(1280, 800);
  vidTreeIntro.position(0, 0)
  vidTreeIntro.hide();

  vidRecording = createVideo("6_Recording.mp4");
  vidRecording.size(1280, 800);
  vidRecording.position(0, 0)
  vidRecording.hide();

  vidUploading = createVideo("7_Uploading.mp4");
  vidUploading.size(1280, 800);
  vidUploading.position(0, 0)
  vidUploading.hide();

  vidEmail = createVideo("8_Email.mp4");
  vidEmail.size(1280, 800);
  vidEmail.position(0, 0)
  vidEmail.hide();

  buttonStart = createButton("Click to start");
  buttonStart.position(width / 2 - 120, height / 2 + 100);
  buttonStart.mouseOver(HoverOver);
  buttonStart.mouseOut(HoverOut);

  buttonStart.mousePressed(transition1);

  buttonNext1 = createButton("Next");
  buttonNext1.position(width / 2 - 80, height / 2 + 100);
  buttonNext1.mouseOver(HoverOver);
  buttonNext1.mouseOut(HoverOut);
  buttonNext1.hide();

  buttonNext1.mousePressed(transition2);


  buttonSubmitName = createButton("Submit");
  buttonSubmitName.position(width / 2 - 100, height / 2 + 150);
  buttonSubmitName.mouseOver(HoverOver);
  buttonSubmitName.mouseOut(HoverOut);
  buttonSubmitName.hide();

  buttonSubmitName.mousePressed(transition3);

  buttonRecord = createButton("Start to record");
  buttonRecord.position(width / 2 - 130, height / 2 + 130);
  buttonRecord.mouseOver(HoverOver);
  buttonRecord.mouseOut(HoverOut);
  buttonRecord.hide();

  buttonRecord.mousePressed(transitionRecord);
  buttonclicked = true;

  buttonStop = createButton("Stop");
  buttonStop.position(width / 2 - 75, height / 2 + 100);
  buttonStop.mouseOver(HoverOver);
  buttonStop.mouseOut(HoverOut);
  buttonStop.hide();
  buttonStop.mousePressed(transitionStop);

  buttonUpload = createButton("Upload to the tree");
  buttonUpload.position(width / 2 - 150, height / 2 + 100);
  buttonUpload.mouseOver(HoverOver);
  buttonUpload.mouseOut(HoverOut);
  buttonUpload.hide();

  buttonUpload.mousePressed(transitionUpload);

  buttonNext2 = createButton("Next");
  buttonNext2.position(width / 2 - 80, height / 2 + 100);
  buttonNext2.mouseOver(HoverOver);
  buttonNext2.mouseOut(HoverOut);
  buttonNext2.hide();

  buttonNext2.mousePressed(getEmail);



  InputName = createInput("Type Your Name");
  InputName.position(width / 2 - 240, height / 2 + 50);
  InputName.size(400, 60);
  InputName.hide();
  InputName.mousePressed(clearTypeYourName);

  InputEmail = createInput("Type Your Email");
  InputEmail.size(400, 60);
  InputEmail.position(width / 2 - 240, height / 2 + 50);
  InputEmail.hide();
  InputEmail.mousePressed(clearTypeYourEmail);

  SubmitInformation = createButton("Submit");
  SubmitInformation.position(width / 2 - 100, height / 2 + 150);
  SubmitInformation.mouseOver(HoverOver);
  SubmitInformation.mouseOut(HoverOut);
  SubmitInformation.hide();
  SubmitInformation.mousePressed(returnback);

  serial.write(2);
}


function draw() {
}

function transition1() {

  buttonStart.hide();
  vidStart.hide();
  vidSayHello.show();
  vidSayHello.play();

  lang = 'en-US';
  Hello = new p5.SpeechRec(lang, showHello); // speech recognition object (will prompt for mic access)
  Hello.onResult = showHello; // bind callback function to trigger when speech is recognized
  Hello.start(true, false);
}

function showHello() {
  print(Hello.resultString);
  if (Hello.resultString == 'hello') {
    print('getHello');
    serial.write(3);
    Hello.rec.stop();
    vidSayHello.hide();
    vidIamListening.show();
    vidIamListening.play();
    setTimeout(showbuttonNext1, 1500);
  }
}

function showbuttonNext1() {
  buttonNext1.show();
}

function transition2() {
  buttonNext1.hide();
  vidIamListening.hide();
  vidWhatsYourName.show();
  vidWhatsYourName.play();
  setTimeout(showInputName, 6000);
  setTimeout(showSubmitName, 9000);
}

function showInputName () {
  InputName.show();
}

function showSubmitName () {
  buttonSubmitName.show();
}

function transition3() {
  vidWhatsYourName.hide();
  InputName.hide();
  buttonSubmitName.hide();
  userName = createP('Hi ' + InputName.value())
  userName.style('font-family', 'Futura');
  userName.style('font-size', '32pt');
  userName.style('color', '#FFFFE7');
  userName.position(width/2 - 70, height/2 - 230);
  vidTreeIntro.show();
  vidTreeIntro.play();
  setTimeout(hideUserName, 3000);
  setTimeout(showButtonRecord, 21000);
}

function hideUserName() {
	userName.hide();
}

function showButtonRecord() {
  buttonRecord.show();
}

function transitionRecord(data) {
  clear();
  userName.hide();
  serial.write(0);
  console.log(0);
  buttonRecord.hide();
  buttonStop.show();
  vidTreeIntro.hide();
  vidRecording.show();
  vidRecording.loop();

  //callback function "gotText"
  lang = 'en-US';
  foo = new p5.SpeechRec(lang, showResult); // speech recognition object (will prompt for mic access)
  foo.onResult = showResult; // bind callback function to trigger when speech is recognized
  foo.start(true, false); // start listening
}

function transitionStop(data) {

  foo.rec.stop();
  vidRecording.hide();
  buttonStop.hide();
  buttonUpload.show();
}

function transitionUpload() {
  serial.write(1);
  console.log(1);
  buttonUpload.hide();
  vidUploading.show();
  vidUploading.play();
  setTimeout(showbuttonNext2, 10000);
}

function showbuttonNext2() {
  buttonNext2.show();
}
function showResult() {

  let y = year();
	let m = month();
	let d = day();
	let h = hour();
  let mi = minute();
  let se = second();

  print(foo.resultString); // log the result
  if (foo.resultString) {
    background('#292F37');
    fill(255);
    textSize(32);
    textAlign(CENTER);
    textFont("Futura")
    text("'  " + foo.resultString + "  '", width / 2, 300);
    text( y + "/" + m + "/"+ d + "   " + h + ":" + mi + ":"+ se + "   "+ InputName.value() + "  says", width / 2, 200)
  }
}

function getEmail() {
  vidUploading.hide();
  buttonNext2.hide();
  vidEmail.show();
  vidEmail.play();
  setTimeout(showEmailInput, 2000);
  setTimeout(showSubmitEmail, 5000);

}

function showEmailInput() {
	InputEmail.show();
}

function showSubmitEmail() {
	SubmitInformation.show()
}

function returnback() {
  serial.write(2);
  console.log(2);
  vidStart.show();
  vidStart.play();
  buttonStart.show();
  vidEmail.hide();
  InputEmail.hide();
  SubmitInformation.hide();



  if (buttonclicked) {
    counter = counter + 1;
  }
  for (let i = 0; i < 1; i++) {
    index[i] = counter;
    let testText = random(1, 5);
    let now = new Date();
    let daysInBewteen = 1;
    let dateToSend = new Date(now.setDate(now.getDate() + daysInBewteen));
    let sendworry = {
    "index":
    index[i],
    "message":
    foo.resultString,
    "timeRecorded":
    now,
    "timeToSend":
    dateToSend,
    "Name":
    InputName.value(),
    "Email":
    InputEmail.value()
  }
  httpPost(url, 'json', sendworry, gotData);
  InputName.value('Type Your Name');
  InputEmail.value('Type your Email');
  background('#292F37');
}

function gotData(data) {
  print(data);
}

}

function HoverOver() {

  buttonStart.style('background-color', '#39414D');
  buttonRecord.style('background-color', '#39414D');
  buttonStop.style('background-color', '#39414D');
  buttonUpload.style('background-color', '#39414D');
  buttonNext1.style('background-color', '#39414D');
  buttonNext2.style('background-color', '#39414D');
  buttonSubmitName.style('background-color', '#39414D');
  SubmitInformation.style('background-color', '#39414D');
}

function HoverOut() {

  buttonStart.style('background-color', '#292F37');
  buttonRecord.style('background-color', '#292F37');
  buttonStop.style('background-color', '#292F37');
  buttonUpload.style('background-color', '#292F37');
  buttonNext1.style('background-color', '#292F37');
  buttonNext2.style('background-color', '#292F37');
  buttonSubmitName.style('background-color', '#292F37');
  SubmitInformation.style('background-color', '#292F37');
}

function clearTypeYourName() {
	InputName.value("");
}

function clearTypeYourEmail() {
  InputEmail.value("");
}
