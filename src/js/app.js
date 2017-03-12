let synth = window.speechSynthesis,
    pitch = document.getElementById('pitch'),
    volume = document.getElementById('volume'),
    rate = document.getElementById('rate'),
    run = document.getElementById('run'),
    output = document.getElementById('status'),
    input = document.getElementById('textInput'),
    select = document.querySelector('select');



function populateVoiceList() {
    let voices = synth.getVoices();
    for (element of voices) {
        option = document.createElement('option');
        option.innerHTML = element.lang + "  " + element.name;
        option.value = element.lang;
        option.setAttribute('data-lang', element.lang);
        select.appendChild(option);
    }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoiceList;
}
run.onclick = (() => {
    let speaking = new Promise((success, failure) => {
        let msg = new SpeechSynthesisUtterance();
        msg.lang = select.selectedOptions[0].getAttribute('data-lang');
        msg.volume = volume.value;
        msg.rate = rate.value;
        msg.pitch = pitch.value;
        msg.text = input.value;

        msg.onend = (event) => {
            success(event)
        };
        speechSynthesis.speak(msg);
    });

    output.textContent = 'Speaking';
    speaking.then((event) => {
        output.textContent = 'Done';
    });
});


resume.onclick = ()=> {
  synth.resume();

}
pause.onclick = ()=> {
  synth.pause()
}
