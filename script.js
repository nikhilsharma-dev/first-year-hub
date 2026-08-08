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
// SMART SUBJECT SEARCH
// ===============================

function searchSubject(){

    const searchBox =
        document.getElementById("searchBox");

    if(!searchBox) return;

    const input =
        searchBox.value
        .trim()
        .toLowerCase();

    if(input === ""){

        alert("Please enter a subject name!");

        return;
    }


    // ===============================
    // SUBJECTS + SEARCH KEYWORDS
    // ===============================

    const subjects = [

        // Mathematics I
        {
            name: "📐 Engineering Mathematics-I",
            page: "engineering-mathematics-1.html",

            keywords: [
                "math",
                "maths",
                "mat",
                "mathematics",
                "math 1",
                "maths 1",
                "maths1",
                "mathematics 1",
                "mathematics i",
                "engineering mathematics",
                "engineering mathematics 1",
                "engineering mathematics i",
                "engineering maths"
            ]
        },


        // Mathematics II
        {
            name: "📐 Engineering Mathematics-II",
            page: "maths2.html",

            keywords: [
                "math 2",
                "maths 2",
                "maths2",
                "mathematics 2",
                "mathematics ii",
                "engineering mathematics 2",
                "engineering mathematics ii",
                "engineering maths 2"
            ]
        },


        // Physics
        {
            name: "⚡ Physics",
            page: "physics.html",

            keywords: [
                "physics",
                "phy",
                "phys",
                "physics subject"
            ]
        },


        // BEE
        {
            name: "🔌 Basic Electrical Engineering",
            page: "bee.html",

            keywords: [
                "bee",
                "b ee",
                "basic electric",
                "basic electrical",
                "basic electrical engineering",
                "electrical",
                "electric",
                "electricity",
                "electrical engineering",
                "basic electric engineering"
            ]
        },


        // C Programming
        {
            name: "💻 C Programming",
            page: "c.html",

            keywords: [
                "c",
                "c language",
                "c programming",
                "programming in c"
            ]
        },


        // Python
        {
            name: "🐍 Python",
            page: "python.html",

            keywords: [
                "python",
                "py",
                "python programming",
                "python language"
            ]
        },


        // Web Technology
        {
            name: "🌐 Web Technology",
            page: "fwt.html",

            keywords: [
                "fwt",
                "web",
                "web tech",
                "web technology",
                "web technologies",
                "html",
                "css",
                "javascript",
                "java script",
                "js",
                "website",
                "web development",
                "frontend",
                "front end"
            ]
        },


        // AI & ML
        {
            name: "🤖 AI & Machine Learning",
            page: "aiml.html",

            keywords: [
                "aiml",
                "ai ml",
                "ai",
                "artificial intelligence",
                "machine learning",
                "ml",
                "artificial intelligence and machine learning"
            ]
        },


        // Engineering Mechanics
        {
            name: "⚙️ Engineering Mechanics",
            page: "mechanics.html",

            keywords: [
                "mechanics",
                "mechanic",
                "engineering mechanics",
                "engg mechanics",
                "engineering mechanic"
            ]
        },


        // DSA
        {
            name: "📚 Data Structures & Algorithms",
            page: "dsa.html",

            keywords: [
                "dsa",
                "data structure",
                "data structures",
                "algorithm",
                "algorithms",
                "data structure and algorithm",
                "data structures and algorithms"
            ]
        }

    ];


    // ===============================
    // FIND MATCHING SUBJECTS
    // ===============================

    const results = subjects.filter(subject => {

        return subject.keywords.some(keyword => {

            return (
                keyword === input ||
                keyword.includes(input) ||
                input.includes(keyword)
            );

        });

    });


    // ===============================
    // REMOVE DUPLICATES
    // ===============================

    const uniqueResults = [];

    results.forEach(subject => {

        if(!uniqueResults.some(
            item => item.page === subject.page
        )){

            uniqueResults.push(subject);

        }

    });


    // ===============================
    // NO RESULT
    // ===============================

    if(uniqueResults.length === 0){

        alert(
            "❌ Subject not found!\n\n" +
            "Try: Math, Physics, BEE, C, Python, Web, AI, Mechanics or DSA."
        );

        return;
    }


    // ===============================
    // SEARCH RESULT BOX
    // ===============================

    let resultBox =
        document.getElementById("searchResults");


    if(!resultBox){

        resultBox =
            document.createElement("div");

        resultBox.id =
            "searchResults";

        resultBox.style.marginTop =
            "20px";

        const searchSection =
            document.querySelector(".search");

        if(searchSection){

            searchSection.appendChild(
                resultBox
            );

        }

    }


    resultBox.innerHTML = "";


    // ===============================
    // RESULT TITLE
    // ===============================

    const title =
        document.createElement("h3");

    title.innerText =
        "🔎 Search Results";

    resultBox.appendChild(title);


    // ===============================
    // SHOW RESULTS
    // ===============================

    uniqueResults.forEach(subject => {

        const button =
            document.createElement("button");

        button.innerText =
            subject.name;

        button.style.display =
            "block";

        button.style.width =
            "100%";

        button.style.margin =
            "10px 0";

        button.style.padding =
            "12px";

        button.style.cursor =
            "pointer";


        button.onclick = function(){

            window.location.href =
                subject.page;

        };


        resultBox.appendChild(
            button
        );

    });

}


// ===============================
// DARK MODE
// ===============================

function toggleDarkMode(){

    document.body.classList.toggle("dark");

    if(
        document.body.classList.contains("dark")
    ){

        localStorage.setItem(
            "theme",
            "dark"
        );

    }else{

        localStorage.setItem(
            "theme",
            "light"
        );

    }

}


// ===============================
// VISITOR COUNTER
// ===============================

async function countVisitor(){

    try{

        // Check if browser already counted
        const alreadyCounted =
            localStorage.getItem(
                "visitorCounted"
            );


        // Already counted
        if(alreadyCounted === "yes"){

            const {
                count,
                error
            } = await supabaseClient
                .from("visitors")
                .select("*", {
                    count: "exact",
                    head: true
                });


            if(error){

                console.log(
                    "Visitor count error:",
                    error
                );

                return;

            }


            const counter =
                document.getElementById(
                    "visitorCount"
                );


            if(counter){

                counter.innerText =
                    count;

            }

            return;

        }


        // ===============================
        // NEW VISITOR
        // ===============================

        const { error } =
            await supabaseClient
                .from("visitors")
                .insert({});


        if(error){

            console.log(
                "Visitor insert error:",
                error
            );

            return;

        }


        // Remember this browser
        localStorage.setItem(
            "visitorCounted",
            "yes"
        );


        // ===============================
        // GET TOTAL VISITORS
        // ===============================

        const {
            count,
            error: countError
        } = await supabaseClient
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


        const counter =
            document.getElementById(
                "visitorCount"
            );


        if(counter){

            counter.innerText =
                count;

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


    // ===============================
    // DARK MODE
    // ===============================

    if(
        localStorage.getItem("theme")
        === "dark"
    ){

        document.body.classList.add(
            "dark"
        );

    }


    // ===============================
    // SEARCH ENTER KEY
    // ===============================

    const search =
        document.getElementById(
            "searchBox"
        );


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


    // ===============================
    // VISITOR COUNTER
    // ===============================

    countVisitor();

};