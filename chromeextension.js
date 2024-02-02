let myLeads = [];
const saveInput = document.getElementById("input-btn");
const deleteInput = document.getElementById("delete-btn");
const inputEl = document.getElementById("input-el");
const savedLeads = document.getElementById("saved-leads")
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem ("myLeads"));
const tabBtn = document.getElementById("tab-btn");

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}
tabBtn.addEventListener("click", function(){
   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    myLeads.push(tabs[0].url)
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads)
   })
}
)

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += 
        `<li>
        <a target='_blank' href='${leads[i]}' >
        ${leads[i]}
        </a>
        </li>` 
    };
    ulEl.innerHTML = listItems
}

saveInput.addEventListener("click", function() {
    myLeads.push(inputEl.value) 
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads)
}   
); 

inputEl.addEventListener("keypress", function(Keyboardevent) {
    if(Keyboardevent.key === "Enter"){
        saveInput.click()
        //listItems = []
    }
    }
)

deleteInput.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})
