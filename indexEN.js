function supprimerStylesExtensions() {
    // Parcourez tous les éléments de la page
    // Recherchez la balise script avec l'attribut src égal à "index.js" et type égal à "text/babel".
var scriptElement = document.querySelector('script[src="index.js"][type="text/babel"]');

if (scriptElement) {
    // Supprimez les balises qui suivent la balise script.
    var nextSibling = scriptElement.nextSibling;

    while (nextSibling) {
        var toRemove = nextSibling;
        nextSibling = toRemove.nextSibling;
        toRemove.parentNode.removeChild(toRemove);
    }
}
}

// Appelez la fonction lorsque la page se charge
window.addEventListener("load", supprimerStylesExtensions);


var buttonJava = document.getElementById("java")
var buttonCsharp = document.getElementById("C")
var buttonHCJ = document.getElementById("HCJ")
var buttonPython = document.getElementById("Python")
var buttonLinux = document.getElementById("Linux")
// var buttonMDP = document.getElementById("MDP")
var buttonBD = document.getElementById("BD")
var buttonRS = document.getElementById("RS")
var app = document.getElementById("app")
var allbutton = document.querySelectorAll("nav div")
var listprojet = document.querySelector(".projet")
var Portfolio = document.querySelector(".portFolio")
var contact = document.getElementById("list")
var contact2 = document.querySelector(".contact")
var sphere = document.querySelector(".sphere")
var all = document.querySelector(".page")
var imgProjetJava1="/images/java/projet-1/Code-typing-bro.png"
var imgProjetJava2="/images/java/projet-2/Programming-amico.png"
var imgProjetCsharp1="/images/Csharp/projet-1/UI-UX-team-amico.png"
var imgProjetHCJ2="/images/HCJ/Digital-transformation-amico.png"
var imgRskPy="/images/Python/rsk/miniature.png"
var lienSite = "http://127.0.0.1:5500"
const lien = <h1 class="suivant">Resumé<i class="icofont-arrow-right"></i></h1>
class ProjetJava extends React.Component {
    render() {
        const items = [
            <img class='image odomo' src={imgProjetJava1} alt='odomo' />,
            <img class='image biosphère' src={imgProjetJava2} alt='Biosphère' />,
        ]
        const java = <img class='logo' src='./images/java/javalogo.png' alt='javalogo'></img>
        const lis = items.map(item => <div><h1 class="resumer"></h1><li>{java}{item}</li>{lien}</div>)
        return <ul>
            {lis}
        </ul>
    }
}
class FenetreProjet extends React.Component {
    render() {
        return <div class="contenu">
            <i class="icofont-close-line-circled icofont-5x"></i>
            <h1>{this.props.title}</h1>
            <img class='reTEX' src={this.props.image}></img>
            <p>{this.props.text}</p>
            <form action={this.props.url}>
                <button class="Download" type="submit"><i class="icofont-download"></i>PDF</button>
            </form>
        </div>
    }
}
class FenetreProjetMackdown extends React.Component {
    render() {
        return <div class="contenu">
            <i class="icofont-close-line-circled icofont-5x"></i>
            <h1>{this.props.title}</h1>
            <img class='reTEX' src={this.props.image}></img>
            <p>{this.props.text}</p>
            <form action={this.props.url}>
                <button class="Download" type="submit"><i class="icofont-download"></i>Rapport Markdown</button>
            </form>
        </div>
    }
}

class FenetreProjetVideo extends React.Component {
    render() {
        return <div class="contenu">
            <i class="icofont-close-line-circled icofont-5x"></i>
            <h1>{this.props.title}</h1>
            <video controls class='reTEX' src={this.props.video}>
                Download la video
            </video>
            <p>{this.props.text}</p>
            <form action={this.props.url}>
                <button class="Download" type="submit"><i class="icofont-download"></i>video</button>
            </form>
        </div>
    }
}
class FenetreProjetWebCliquable extends React.Component {
    render() {
        return <div class="contenu">
            <i class="icofont-close-line-circled icofont-5x"></i>
            <h1>{this.props.title}</h1>
            <a href={this.props.link}><img class='reTEX' src={this.props.image}></img></a>
            <p>{this.props.text}</p>
            <form action={this.props.url}>
                <button class="Download" type="submit"><i class="icofont-download"></i>PDF</button>
            </form>
        </div>
    }
}
class FenetreProjetWeb extends React.Component {
    render() {
        return <div class="contenu">
            <i class="icofont-close-line-circled icofont-5x"></i>
            <h1>{this.props.title}</h1>
            <img class='reTEX' src={this.props.image}></img>
            <p>{this.props.text}</p>
            <form action={this.props.url}>
                <button class="Download" type="submit"><i class="icofont-download"></i>website</button>
            </form>
        </div>
    }
}
class ProjetCsharp extends React.Component {
    render() {
        const items = [
            <img class='image Hyperstellar' src={imgProjetCsharp1} alt='Hyperstellar' />,
        ]
        const C = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><h1 class="resumer"></h1><li>{C}{item}</li>{lien}</div>)
        return <ul>
            {lis}
        </ul>
    }
}
class ProjetPy extends React.Component {
    render() {
        const items = [
            <img class='image robot' src={imgRskPy} alt='Robot'/>
        ]
        const Py = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><h1 class="resumer"></h1><li>{Py}{item}</li>{lien}</div>)
        return <ul>
            {lis}
        </ul>
    }
}
class ProjetHCJ extends React.Component {
    render() {
        const items = [
            <img class='image thales' src='./images/HCJ/maquetteSite.png' alt='maquette' />,
            <img class='image portfolio' src='./images/HCJ/portfolio.png' alt='portfolio' />
        ]
        const HCJ = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><h1 class="resumer"></h1><li>{HCJ}{item}</li>{lien}</div>)
        return <ul>
            {lis}
        </ul>
    }
}
class ProjetMDP extends React.Component {
    render() {
        const items = [
        ]
        const MDP = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><li>{MDP}{item}</li><i class="icofont-close"></i><i class="icofont-expand"></i></div>)
        return <ul>
            {lis}
        </ul>
    }
}
class ProjetBD extends React.Component {
    render() {
        const items = [
            <img class='image Festival' src='./images/SQL/MCD.jpg' alt='BD' />,
        ]
        const BD = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><h1 class="resumer"></h1><li>{BD}{item}</li>{lien}</div>)
        return <ul>
            {lis}
        </ul>
    }
}
class ProjetLinux extends React.Component {
    render() {
        const items = [
            <img class='image poste' src='./images/Linux/schemaPoste.jpg' alt='Poste' />,
            <img class='image network' src='./images/Linux/schemaNetwork.jpg' alt='Network' />
        ]
        const lis = items.map(item => <div><h1 class="resumer"></h1><li>{item}</li>{lien}</div>)
        return <ul>
            {lis}
        </ul>
    }
}
class ProjetRS extends React.Component {
    render() {
        const items = [
        ]
        const RS = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><li>{RS}{item}</li><i class="icofont-close"></i><i class="icofont-expand"></i></div>)
        return <ul>
            {lis}
        </ul>
    }
}


function selectRandomNavButton() {
    const navButtons = document.querySelectorAll("nav button");
    const randomIndex = Math.floor(Math.random() * navButtons.length);
    navButtons[randomIndex].classList.add("press");
    setTimeout(() => {
        navButtons[randomIndex].classList.remove("press");
    }, 1000);
}
setInterval(selectRandomNavButton, 1000);
function desactiver() {
    for (var i = 0; i < allbutton.length; i++) {

        allbutton[i].classList.remove("up");
        allbutton[i].style.setProperty('--h', 100 + '%')

    }
    listprojet.classList.remove("colorJava");
    listprojet.classList.remove("colorC")
    listprojet.classList.remove("colorPy")
    listprojet.classList.remove("colorHCJ")
    listprojet.classList.remove("colorMDP")
    listprojet.classList.remove("colorBD")
    listprojet.classList.remove("colorLinux")
    listprojet.classList.remove("colorRS")
}

var etoileHaut = document.querySelector('.Top');
var etoileBas = document.querySelector('.Bottom');
var etoileDroite = document.querySelector('.Right');
var etoileLeft = document.querySelector('.Left');
let n = 0
let r = 0;
let animation = setInterval((e) => {
    etoileHaut.style.paddingLeft = n + '%'
    etoileBas.style.paddingLeft = n + '%'
    etoileLeft.style.paddingBottom = r + '%'
    etoileDroite.style.paddingTop = r + '%'
    if (n < 90) {
        n += 0.5;
    } else {
        window.clearInterval(animation)
    }
    if (r < 30) {
        r += 0.17;
    }

}, 16)

buttonJava.addEventListener("click", desactiver)
buttonJava.addEventListener("mouseover", () => {
    var logoJava = document.querySelector("#java img")
    logoJava.src = "./images/logo/logoJava/2.png"
})
buttonJava.addEventListener("mouseout", () => {
    var logoJava = document.querySelector("#java img")
    logoJava.src = "./images/logo/logoJava/1.png"
})
buttonJava.addEventListener("click", () => {
    listprojet.classList.add("colorJava")
    buttonJava.classList.add("up")
    ReactDOM.render(<ProjetJava />, listprojet)
    var resume = document.querySelectorAll(".resumer")
    resume[0].innerHTML = "Complete an ongoing project <i class='icofont-check'></i>"
    resume[1].innerHTML = "Create an AI from scratch <i class='icofont-check'></i>"
    var logo = document.querySelectorAll(".logo")
    setInterval(() => {
        for (var i = 0; i < logo.length; i++) {
            logo[i].classList.toggle("move")
        }
    }, 2000)
    var open = document.querySelectorAll(".projet ul div")
    open.forEach((userItem) => {
        userItem.addEventListener("click", () => {
            userItem.classList.add("retourner")
            setTimeout(() => {
                if (userItem.children[1].lastChild.src == lienSite+imgProjetJava1) {
                    ReactDOM.render(<FenetreProjet image={"./images/java/projet-1/projet-odomo.png"} text="In this project, a major difficulty was the reading order of values in a table or matrix. The way the values are arranged is not necessarily how we would like to display them. I managed to make it so that for each histogram according to its reading order, the values are arranged in the expected order. Reading a table/matrix was essential in the realization of this project." title="Meteorological Project" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/java/Portfolio-Quentin-java-1.pdf"}></FenetreProjet>, document.querySelector(".window"))
                } else if (userItem.children[1].lastChild.src == lienSite+imgProjetJava2) {
                    ReactDOM.render(<FenetreProjet image={"./images/java/projet-2/projet-biosphère.png"} text="The project is called Biosphère7, written in Java. It is a board game with 15 levels that allows different actions according to the rules of the level that accumulate. My contribution is the realization, up to level 11, of the table of possible actions according to the new rules of each level. The second part of the project was the most enriching for me with the implementation of an AI with the choice of the method to follow, and I managed to make a reinforcement learning method with a QLearning algorithm (off policy)." title="Project: Designing a game and an AI" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/java/Portfolio-Quentin-java-2.pdf"}></FenetreProjet>, document.querySelector(".window"))
                }
                document.querySelector(".window").classList.remove("cacher")
                document.querySelector(".icofont-close-line-circled").addEventListener("click", () => {
                    userItem.classList.remove("retourner")
                    ReactDOM.render(<FenetreProjet image={""} text="" title=""></FenetreProjet>, document.querySelector(".window"))
                    document.querySelector(".window").classList.add("cacher")
                })
            }, 2000);
        })
    })
    // Redirect to the anchor tag with class .projet
    window.location.href = `#exp`;

})


listprojet.style.visibility = "hidden"
allbutton.forEach((userItem) => {
    userItem.addEventListener("mousedown", () => {
        userItem.style.scale = "0.8";
        userItem.style.transition = "0.1s";
        listprojet.style.visibility = "visible";
    });
    userItem.addEventListener("mouseup", () => {
        userItem.style.scale = "1"
    })
}
)
buttonCsharp.addEventListener("click", desactiver)
buttonCsharp.addEventListener("mouseover", () => {
    var logoCsharp = document.querySelector("#C img")
    logoCsharp.src = "./images/logo/logoCsharp/2.png"
})
buttonCsharp.addEventListener("mouseout", () => {
    var logoCsharp = document.querySelector("#C img")
    logoCsharp.src = "./images/logo/logoCsharp/1.png"
})
buttonCsharp.addEventListener("click", () => {
    buttonCsharp.classList.add("active")
    listprojet.classList.add("colorC")
    buttonCsharp.classList.add("up")
    ReactDOM.render(<ProjetCsharp />, listprojet)
    var resume = document.querySelectorAll(".resumer")
    resume[0].innerHTML = "Development of an application <i class='icofont-check'></i>"
    var open = document.querySelectorAll(".projet ul div")
    open.forEach((userItem) => {
        userItem.addEventListener("click", () => {
            userItem.classList.add("retourner")
            setTimeout(() => {
                
                if (userItem.children[1].lastChild.src == lienSite+imgProjetCsharp1) {
                    ReactDOM.render(<FenetreProjet image={"./images/Csharp/projet-1/projet-jeux.jpg"} text="In this project, the major challenge was the harmonious association between the visual part and the development of functionalities. It was essential to transcribe, in the virtual context in two dimensions, the elements and rules of a classic board game in a way that simplifies the gaming experience for users. For example, we automated aspects such as shuffling cards or positioning pawns, so that players could focus on their choices and actions." title="Application Project" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/C#/Portfolio-Quentin-C-1.pdf"}></FenetreProjet>, document.querySelector(".window"))
                }
                document.querySelector(".window").classList.remove("cacher")
                document.querySelector(".icofont-close-line-circled").addEventListener("click", () => {
                    userItem.classList.remove("retourner")
                    ReactDOM.render(<FenetreProjet image={""} text="" title=""></FenetreProjet>, document.querySelector(".window"))
                    document.querySelector(".window").classList.add("cacher")
                })
            }, 2000);
        })
    })
    // Redirect to the anchor tag with class .projet
    window.location.href = `#exp`;
    
})
buttonPython.addEventListener("click", desactiver)
buttonPython.addEventListener("mouseover", () => {
    var logoPython = document.querySelector("#Python img")
    logoPython.src = "./images/logo/logoPython/2.png"
})

buttonPython.addEventListener("mouseout", () => {
    var logoPython = document.querySelector("#Python img")
    logoPython.src = "./images/logo/logoPython/1.png"
})
buttonPython.addEventListener("click", () => {
    buttonPython.classList.add("active")
    listprojet.classList.add("colorPy")
    buttonPython.classList.add("up")
    ReactDOM.render(<ProjetPy />, listprojet)
    var resume = document.querySelectorAll(".resumer")
    resume[0].innerHTML = "Robot: Predicting the opponent's shot <i class='icofont-check'></i>"
    var open = document.querySelectorAll(".projet ul div")
    open.forEach((userItem) => {
        userItem.addEventListener("click", () => {
            console.log(userItem.children[1].lastChild)
            userItem.classList.add("retourner")
            setTimeout(() => {
                
                if (userItem.children[1].lastChild.src == lienSite+imgRskPy) {
                    ReactDOM.render(<FenetreProjetVideo video={"./Video/Python/Gardien/Prediction.mp4"} text="As part of a robot soccer competition, I programmed a predictive goalkeeper strategy in Python. The goal is to predict the trajectory of the ball and position accordingly to stop it. By using the orientation of the nearest opponent robot to the ball, I was able to predict the only possible interval where the ball could go after the opponent robot's shot. The most difficult part was solving the case where if the opponent robot changes its orientation after its shot, the goalkeeper should not change its position. This strategy helped my team of 4 players become vice-champions of Europe in robotics." title="Programming a predictive goalkeeper strategy" url={"https://github.com/atari643/atari643.github.io/raw/rendu/Video/Python/Gardien/Prediction.mp4"}></FenetreProjetVideo>, document.querySelector(".window"))
                }
                document.querySelector(".window").classList.remove("cacher")
                document.querySelector(".icofont-close-line-circled").addEventListener("click", () => {
                    userItem.classList.remove("retourner")
                    ReactDOM.render(<FenetreProjetVideo video={""} text="" title=""></FenetreProjetVideo>, document.querySelector(".window"))
                    document.querySelector(".window").classList.add("cacher")
                })
            }, 2000);
        })
    })
    // Redirect to the anchor tag with class .projet
    window.location.href = `#exp`;
})

buttonBD.addEventListener("click", desactiver)
buttonBD.addEventListener("mouseover", () => {
    var logoBD = document.querySelector("#BD img")
    logoBD.src = "./images/logo/logoSql/2.png"
})
buttonBD.addEventListener("mouseout", () => {
    var logoBD = document.querySelector("#BD img")
    logoBD.src = "./images/logo/logoSql/1.png"
})
buttonBD.addEventListener("click", () => {
    buttonBD.classList.add("active")
    buttonBD.classList.add("up")
    listprojet.classList.add("colorBD")
    ReactDOM.render(<ProjetBD />, listprojet)
    var resume = document.querySelectorAll(".resumer")
    resume[0].innerHTML = "Création d’une base de données <i class='icofont-check'></i>"
    var open = document.querySelectorAll(".projet ul div")
    open.forEach((userItem) => {
        userItem.addEventListener("click", () => {
            userItem.classList.add("retourner")
            setTimeout(() => {
                if (userItem.children[1].lastChild.src == lienSite+"/images/SQL/MCD.jpg") {
                    ReactDOM.render(<FenetreProjet image={"./images/SQL/schemaBase.jpg"} text="La conclusion du projet est qu'il est intéressant d’un point de vue apprentissage. Le thème est jeune et
        dynamique en matière de liberté de référence (artiste). Le thème de la qualité des données
        est extrêmement important et je pense que l’avoir traité est primordial. Aujourd’hui, le
        modèle économique mondial tant énormément dans la collecte, le traitement et l’utilisation
        des données comme nouvelle monnaie." title="Projet Base de données pour un festival" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/SQL/Portfolio-Quentin-SQL-1.pdf"}></FenetreProjet>, document.querySelector(".window"))
                }
                document.querySelector(".window").classList.remove("cacher")
                document.querySelector(".icofont-close-line-circled").addEventListener("click", () => {
                    userItem.classList.remove("retourner")
                    ReactDOM.render(<FenetreProjet image={""} text="" title=""></FenetreProjet>, document.querySelector(".window"))
                    document.querySelector(".window").classList.add("cacher")
                })
            }, 2000);
        })
    })
    // Redirect to the anchor tag with class .projet
    window.location.href = `#exp`;
})

buttonHCJ.addEventListener("click", desactiver)
buttonHCJ.addEventListener("mouseover", () => {
    var logoWeb = document.querySelector("#HCJ img")
    logoWeb.src = "./images/logo/logoWeb/2.png"
})
buttonHCJ.addEventListener("mouseout", () => {
    var logoWeb = document.querySelector("#HCJ img")
    logoWeb.src = "./images/logo/logoWeb/1.png"
})
buttonHCJ.addEventListener("click", () => {
    buttonHCJ.classList.add("active")
    buttonHCJ.classList.add("up")
    listprojet.classList.add("colorHCJ")
    ReactDOM.render(<ProjetHCJ />, listprojet)
    var resume = document.querySelectorAll(".resumer")
    resume[0].innerHTML = "Create and follow the site mockup <i class='icofont-check'></i>"
    resume[1].innerHTML = "Create a portfolio using React <img class='logo' style='visibility: visible;' src='./images/logo/logoReact/React.png' alt='React'></img> <i class='icofont-check'></i>"
    var open = document.querySelectorAll(".projet ul div")
    open.forEach((userItem) => {
        userItem.addEventListener("click", () => {
            userItem.classList.add("retourner")
            setTimeout(() => {
                if (userItem.children[1].lastChild.src == lienSite+"/images/HCJ/maquetteSite.png") {
                    ReactDOM.render(<FenetreProjetWebCliquable image={"./images/HCJ/maquetteSite.png"} link={"https://atari643.github.io/projetWeb.github.io/Projet.html"} 
                    text="For our web project, we divided our project time into four parts. The first step concerns the realization of the personas. This represents the type of person we are targeting when creating our website. We chose to target a person studying in a management school who is looking for examples of company presentations. This includes at least one presentation of the 7 functions and a PESTEL analysis.
                    The second part concerns the creation of the mockup of our site." title="Web site creation project: Click on image" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/web/Portfolio-Quentin-web-1.pdf"}></FenetreProjetWebCliquable>, document.querySelector(".window"))
                }else if (userItem.children[1].lastChild.src == lienSite+"/images/HCJ/portfolio.png") {
                    ReactDOM.render(<FenetreProjetWeb image={"./images/HCJ/portfolio.png"} url={"https://atari643.github.io/"} text="This experience was the creation of a portfolio to put all my experiences and projects. I used HTML, CSS, and JavaScript languages for the realization of this portfolio as well as the use and learning of React to facilitate the creation of the site and maintenance with the quick addition of new experiences. Thus, the project allowed me to progress in the field of web development as well as in the discovery of self-learning which made me want to learn other frameworks such as Angular or VueJS to be able to create sites more easily and quickly." title="Portfolio creation project" ></FenetreProjetWeb>, document.querySelector(".window"))
                }
                
                document.querySelector(".window").classList.remove("cacher")
                document.querySelector(".icofont-close-line-circled").addEventListener("click", () => {
                    userItem.classList.remove("retourner")
                    ReactDOM.render(<FenetreProjetWebCliquable image={""} text="" title="" link=""></FenetreProjetWebCliquable>, document.querySelector(".window"))
                    document.querySelector(".window").classList.add("cacher")
                })
            }, 2000);
        })
    })
    // Redirect to the anchor tag with class .projet
    window.location.href = `#exp`;
})
buttonLinux.addEventListener("click", desactiver)
buttonLinux.addEventListener("click", () => {
    buttonLinux.classList.add("active")
    buttonLinux.classList.add("up")
    listprojet.classList.add("colorLinux")
    ReactDOM.render(<ProjetLinux />, listprojet)
    var resume = document.querySelectorAll(".resumer")
    resume[0].innerHTML = "Virtual machine installation <i class='icofont-check'></i>"
    resume[1].innerHTML = "Installation of private IT service for a client <i class='icofont-check'></i>"
    var logo = document.querySelectorAll(".logo")
    setInterval(() => {
        for (var i = 0; i < logo.length; i++) {
            logo[i].classList.toggle("move")
        }
    }, 2000)

    var open = document.querySelectorAll(".projet ul div")
    open.forEach((userItem) => {
        userItem.addEventListener("click", () => {
            userItem.classList.add("retourner")
            setTimeout(() => {
                if (userItem.children[1].lastChild.src == lienSite+"/images/Linux/schemaPoste.jpg") {
                    ReactDOM.render(<FenetreProjet image={"./images/Linux/installerPoste.jpg"} text="The project is a workstation installation for a client who wanted us to configure a Virtual Machine for his team of developers using Golang for video game development. This project allowed us to develop our machine administrator skills, such as creating users, installing certain programs, and especially configuring a machine and its environment to make it functional." title="Client Workstation Installation" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/setup/Portfolio-Quentin-setup-1.pdf"}></FenetreProjet>, document.querySelector(".window"))
                }else if (userItem.children[1].lastChild.src == lienSite+"/images/Linux/schemaNetwork.jpg") {
                    ReactDOM.render(<FenetreProjetMackdown image={"./images/Linux/detailInstallation.png"} text="In this network service installation project, my participation was the configuration of users, network service (Nextcloud, OnlyOffice) in an emulated network. The project allowed me to put my theoretical knowledge of network configuration into practice. As well as the design of a detailed description of the entire installation intended for an understanding without prerequisites of a network installation." title="Network Service Installation" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/setup/Rapport_ARTIGALA_AUBIER_S2B.md"}></FenetreProjetMackdown>, document.querySelector(".window"))
                    var Retex = document.querySelector(".reTEX")
                    Retex.style.width = "33%"
                }
                document.querySelector
                document.querySelector(".window").classList.remove("cacher")
                document.querySelector(".icofont-close-line-circled").addEventListener("click", () => {
                    ReactDOM.render(<FenetreProjet image={""} text="" title=""></FenetreProjet>, document.querySelector(".window"))
                    document.querySelector(".window").classList.add("cacher")
                    userItem.classList.remove("retourner")
                })
            }, 2000);
        })
    })
    // Redirect to the anchor tag with class .projet
    window.location.href = `#exp`;
});

contact.addEventListener("click", () => {
    var lien = document.querySelector(".lien")
    if (lien.classList[1] == "enroule") {
        lien.classList.remove("enroule")
        lien.classList.add("dérouler")
        contact.classList.remove("remonte")
        contact.classList.add("decendre")
        contact2.style.display = "block"
        document.querySelector("#list i").classList.add("icofont-rotate-180")
    } else {
        lien.classList.remove("dérouler")
        lien.classList.add("enroule")
        contact.classList.remove("decendre")
        contact.classList.add("remonte")
        contact2.style.display = "none"
        document.querySelector("#list i").classList.remove("icofont-rotate-180")
    }
})
const containers = document.querySelectorAll('.container');
const cursus = document.querySelector('.cursus');
function checkVisibility() {
    const triggerBottom = window.innerHeight / 5 * 4;

    containers.forEach(container => {
        const containerTop = container.getBoundingClientRect().top;

        if (containerTop < triggerBottom) {
            container.classList.add('show');
        } else {
            container.classList.remove('show');
        }
    });
}

window.addEventListener('scroll', checkVisibility);
checkVisibility(); // Initial check