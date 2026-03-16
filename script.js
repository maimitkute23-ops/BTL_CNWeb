const button = document.getElementById("analyzeBtn");

button.addEventListener("click", analyzeText);

async function analyzeText(){

const text = document.getElementById("feedback").value;

if(text === ""){
alert("Vui lòng nhập phản hồi!");
return;
}

const response = await fetch(
"https://api.groq.com/openai/v1/chat/completions",
{
method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer YOUR_GROQ_API_KEY"
},

body:JSON.stringify({

model:"llama3-8b-8192",

messages:[
{
role:"system",
content:"You are a sentiment analysis AI"
},
{
role:"user",
content:`
Analyze this customer feedback.

Text: ${text}

Return JSON format:

{
sentiment:"",
score:0,
keywords:[],
aspect:{
product:"",
delivery:"",
price:""
},
insight:"",
recommendation:""
}

Score must be between -1 and 1
`
}

]

})

});

const data = await response.json();

const result = data.choices[0].message.content;

displayResult(result);

}
function displayResult(result){

document.getElementById("sentiment").innerText =
"Result: " + result;

}