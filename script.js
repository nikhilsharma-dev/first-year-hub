// ===============================
// SUPABASE CONNECTION
// ===============================

const SUPABASE_URL = "https://vfzgafmtipzjvgjyqwzu.supabase.co";

const SUPABASE_KEY =
"sb_publishable_JahA-52A0zBLrqORFKFT5A_ZSAP30Gm";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ===============================
// SUBJECT SEARCH
// ===============================

function searchSubject(){

    let input = document
        .getElementById("searchBox")
        .value
        .trim()
        .toLowerCase();

    const pages = {
        "maths1": "engineering-mathematics-1.html",
        "engineering mathematics-i": "engineering-mathematics-1.html",
        "maths2": "maths2.html",
        "physics": "physics.html",
        "bee": "bee.html",
        "electrical": "bee.html",
        "c": "c.html",
        "python": "python.html",
        "fwt": "fwt.html",
        "web": "fwt.html",
        "aiml": "aiml.html",
        "mechanics": "mechanics.html",
        "dsa": "dsa.html"
    };

    if(pages[input]){

        window.location.href = pages[input];

    }else if(input != ""){

        alert("Subject not found!");

    }

}


// ===============================
// DARK MODE
// ===============================

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){

        localStorage.setItem("theme", "dark");

    }else{

        localStorage.setItem("theme", "light");

    }

}


// ===============================
// VISITOR COUNTER
// ===============================

async function countVisitor(){

    try{

        // Check if this browser was already counted
        const alreadyCounted =
            localStorage.getItem("visitorCounted");

        // If already counted, only show current total
        if(alreadyCounted === "yes"){

            const { count, error } = await supabaseClient
                .from("visitors")
                .select("*", {
                    count: "exact",
                    head: true
                });

            if(error){

                console.log("Visitor count error:", error);
                return;

            }

            const counter =
                document.getElementById("visitorCount");

            if(counter){

                counter.innerText = count;

            }

            return;
        }


        // New visitor
        const { error } = await supabaseClient
            .from("visitors")
            .insert({});

        if(error){

            console.log("Visitor insert error:", error);
            return;

        }


        // Remember this browser
        localStorage.setItem(
            "visitorCounted",
            "yes"
        );


        // Get total visitors
        const { count, error: countError } =
            await supabaseClient
                .from("visitors")
                .select("*", {
                    count: "exact",
                    head: true
                });

        if(countError){

            console.log(
                "Visitor count error:",
                countError
            );

            return;

        }


        // Show visitor count
        const counter =
            document.getElementById("visitorCount");

        if(counter){

            counter.innerText = count;

        }

    }catch(error){

        console.log(
            "Visitor counter error:",
            error
        );

    }

}


// ===============================
// PAGE LOAD
// ===============================

window.onload = function(){

    // Dark Mode
    if(localStorage.getItem("theme") === "dark"){

        document.body.classList.add("dark");

    }


    // Search Enter Key
    const search =
        document.getElementById("searchBox");

    if(search){

        search.addEventListener(
            "keypress",
            function(e){

                if(e.key === "Enter"){

                    searchSubject();

                }

            }
        );

    }


    // Visitor Counter
    countVisitor();

};