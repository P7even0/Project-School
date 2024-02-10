function websiteValidator()
{
    var userInput = document.getElementById("userInput").value.toLowerCase();

    if (userInput == "java"){
        window.location.href="java.html"
    } 
    else if (userInput == "python")
    {
        window.location.href = "python.html"
    }
    else if (userInput == "c")
    {
        window.location.href = "c.html"
    }
    else
    {
        window.location.href = "error304.html"
    }
}


function compilers(){
    window.location.href = "compile.ejs"
}