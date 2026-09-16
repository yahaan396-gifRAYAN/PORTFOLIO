
const API_KEY = "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"; 
 
let chat = document.getElementById("chat"); 
let input = document.getElementById("message"); 
 
async function sendMessage() { 
 
    console.log("button click huaa"); 
 
    const text = input.value.trim() 
 
    if (!text) return 
 
    addMessage(text, "user") 
 
    input.value = ""; 
    const typing = addMessage("Ai is working on your prompt...", "ai") 
 
    try { 
 
        const response = await 
fetch("https://api.groq.com/openai/v1/chat/completions", { 
            method: "POST", 
            headers: { 
                "Content-Type": "application/json", 
                "Authorization": `Bearer ${API_KEY}` 
            }, 
 
            body: JSON.stringify({
                  model: "openai/gpt-oss-20b", 
                messages: [{ 
                    role: "user", 
                    content: text 
                }] 
            }) 
        }) 
 
        const data = await response.json() 
        typing.remove() 
 
        const reply = data.choices[0].message.content 
        addMessage(reply, "ai") 
 
    } catch (error) { 
        typing.remove(); 
        addMessage("Error connecting to AI", "ai") 
 
    } 
 
} 
 
function addMessage(text, type) { 
 
    const div = document.createElement("div"); 
 
    div.className = type === "user" ? 
        "bg-blue-600 p-3 rounded-lg max-w-xl ml-auto" : 
        "bg-slate-800 p-3 rounded-lg max-w-xl" 
 
    div.innerText = text; 
 
    chat.appendChild(div) 
 
    chat.scrollTop = chat.scrollHeight 
 
    return div; 
}