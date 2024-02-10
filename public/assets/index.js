function websiteValidator() {
    var userInput = document.getElementById("userInput").value.toLowerCase();

    if (userInput == "java") {
        console.log('Redirecting to Java route...');
        window.location.href = "/java";  // Assuming you have a Java route
    } else if (userInput == "python") {
        console.log('Redirecting to Python route...');
        window.location.href = "/python";  // Assuming you have a Python route
    } else if (userInput == "c") {
        console.log('Redirecting to C route...');
        window.location.href = "/c";  // Assuming you have a C route
    } else {
        console.log('Redirecting to error304 route...');
        window.location.href = "/error304";  // Assuming you have an error304 route
    }
}

function compilers() {
    window.location.href = "/compile";  // Redirect to the root route where you render compile.ejs
}