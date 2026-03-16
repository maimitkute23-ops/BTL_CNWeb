const button = document.getElementById("analyzeBtn");

button.addEventListener("click", analyzeText);

async function analyzeText(){

const text = document.getElementById("feedback").value;

if(text === ""){
alert("Vui lòng nhập phản hồi!");
return;
}

const response = await fetch("https://api.openai.com/v1/chat/completions",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer YOUR_API_KEY"
},

body:JSON.stringify({

model:"gpt-4o-mini",

messages:[
{
role:"user",
content:`Analyze sentiment of this text and return JSON:

Text: ${text}

Return:
sentiment
score (-1 to 1)
keywords
aspect analysis
insight
recommendation
`
}

]

})

});

const data = await response.json();

const result = data.choices[0].message.content;

displayResult(result);

}