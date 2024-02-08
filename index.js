function websiteValidator()
{
    var userInput = document.getElementById("userInput").value;

    if (userInput == "Java"){
        window.location.href="java.html"
    } 
    else if (userInput == "Python")
    {
        window.location.href = "python.html"
    }
    else if (userInput == "C")
    {
        window.location.href = "c.html"
    }
    else
    {
        window.location.href = "error304.html"
    }
}


function compilers(){
    window.location.href = "compilers.html"
}