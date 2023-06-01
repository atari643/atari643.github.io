var buttonJava = document.getElementById("java")
var buttonC = document.getElementById("C")
var buttonHCJ = document.getElementById("HCJ")
var buttonPython = document.getElementById("Python")
var buttonLinux = document.getElementById("Linux")
// var buttonMDP = document.getElementById("MDP")
var buttonBD = document.getElementById("BD")
var buttonRS = document.getElementById("RS")
var allbutton = document.querySelectorAll("nav div")
var listprojet = document.querySelector(".projet")
var Portfolio = document.querySelector(".portFolio")
var contact = document.getElementById("list")
var contact2 = document.querySelector(".contact")
var sphere = document.querySelector(".sphere")
var all = document.querySelector(".page")
var lienSite = "https://atari643.github.io"
const lien = <h1 class="suivant">Resumé<i class="icofont-arrow-right"></i></h1>
class ProjetJava extends React.Component {
    render() {
        const items = [
            <img class='image odomo' src='./images/java/projet-1/odomo.png' alt='odomo' />,
            <img class='image biosphère' src='./images/java/projet-2/tableBiosphère.png' alt='Biosphère' />,
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
class FenetreProjetWeb extends React.Component {
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
class ProjetC extends React.Component {
    render() {
        const items = [
        ]
        const C = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><li>{C}{item}</li><i class="icofont-close"></i><i class="icofont-expand"></i></div>)
        return <ul>
            {lis}
        </ul>
    }
}
class ProjetPy extends React.Component {
    render() {
        const items = [
        ]
        const Py = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><li>{Py}{item}</li><i class="icofont-close"></i><i class="icofont-expand"></i></div>)
        return <ul>
            {lis}
        </ul>
    }
}
class ProjetHCJ extends React.Component {
    render() {
        const items = [
            <img class='image thales' src='./images/HCJ/maquetteSite.png' alt='maquette' />
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
    resume[0].innerHTML = "Completer un projet en cours <i class='icofont-check'></i>"
    resume[1].innerHTML = "Créer une IA à partir de rien <i class='icofont-check'></i>"
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
                if (userItem.children[1].lastChild.src == lienSite+"/images/java/projet-1/odomo.png") {
                    ReactDOM.render(<FenetreProjet image={"./images/java/projet-1/projet-odomo.png"} text="Dans ce projet une grande difficulté, c’était le sens de lecture des valeurs dans un tableau ou une matrice. La façon donc les valeurs sont agencées n’est pas forcément comment on aimerait les afficher. J’ai réussi à faire que pour chaque histogramme selon son ordre de lecture, les valeurs se rangent dans l’ordre attendu.
                    La lecture un tableau/matrice était essentiel dans la réalisation de ce projet" title="Projet météorologique" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/java/Portfolio-Quentin-java-1.pdf"}></FenetreProjet>, document.querySelector(".window"))
                } else if (userItem.children[1].lastChild.src == lienSite+"/images/java/projet-2/tableBiosph%C3%A8re.png") {
                    ReactDOM.render(<FenetreProjet image={"./images/java/projet-2/projet-biosphère.png"} text="Le projet se nomme Biosphère7 qui est écrit en java. C’est un jeu de plateau à 15 niveaux qui permet d’effectuer différentes actions selon les règles du niveau qui se cumule. Ma contribution est la réalisation, jusqu’au niveau 11, du tableau des actions possibles selon les nouvelles règles de chaque niveau. La deuxième partie du projet a été pour moi la plus enrichissante avec l’implémentation d’une IA avec le choix de la méthode à suivre, et j’ai réussi à faire une méthode d’apprentissage par renforcement avec un algorithme QLearning (off policy). " title="Projet conception d'un jeu et une IA" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/java/Portfolio-Quentin-java-2.pdf"}></FenetreProjet>, document.querySelector(".window"))
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

}
)
allbutton.forEach((userItem) => {
    userItem.addEventListener("mousedown", () => {
        userItem.style.scale = "0.8"
        userItem.style.transition = "0.1s"
    })
    userItem.addEventListener("mouseup", () => {
        userItem.style.scale = "1"
    })
}
)
buttonC.addEventListener("click", desactiver)
buttonC.addEventListener("mouseover", () => {
    var logoC = document.querySelector("#C img")
    logoC.src = "./images/logo/logoC/2.png"
})
buttonC.addEventListener("mouseout", () => {
    var logoC = document.querySelector("#C img")
    logoC.src = "./images/logo/logoC/1.png"
})
buttonC.addEventListener("click", () => {
    buttonC.classList.add("active")
    listprojet.classList.add("colorC")
    buttonC.classList.add("up")
    ReactDOM.render(<ProjetC />, listprojet)
})
buttonPython.addEventListener("click", desactiver)
buttonPython.addEventListener("mouseover", () => {
    var logoPython = document.querySelector("#Python img")
    logoPython.src = "./images/logo/logoPython/2.png"
})

buttonPython.addEventListener("mousedown", () => {
    buttonPython.style.scale = "0.8"
    buttonPython.style.transition = "0.1s"
})
buttonPython.addEventListener("mouseup", () => {
    buttonPython.style.scale = "1"
    buttonPython.style.transition = "0.2s"
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
})
// buttonMDP.addEventListener("click", desactiver)
// buttonMDP.addEventListener("click", () => {
//     buttonMDP.classList.add("active")
//     buttonMDP.classList.add("up")
//     listprojet.classList.add("colorMDP")
//     ReactDOM.render(<ProjetMDP />, listprojet)
// })
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
    resume[0].innerHTML = "Créer et respecter la maquette du site <i class='icofont-check'></i>"
    var open = document.querySelectorAll(".projet ul div")
    open.forEach((userItem) => {
        userItem.addEventListener("click", () => {
            userItem.classList.add("retourner")
            setTimeout(() => {
                if (userItem.children[1].lastChild.src == lienSite+"/images/HCJ/maquetteSite.png") {
                    ReactDOM.render(<FenetreProjetWeb image={"./images/HCJ/maquetteSite.png"} link={"https://atari643.github.io/projetWeb.github.io/Projet.html"} 
                    text="Pour notre projet web, nous avons divisé notre temps de projet en quatre parties. La première étape concerne la réalisation du personas . Ce dernier représente le type de personne qu'on vise lors de la création de notre site web. Nous avons choisi de viser une personne étudiant dans une école de gestion qui cherche des exemples de présentation d'entreprise. Cette dernière comprenant au moins une présentation des 7 fonctions et une analyse PESTEL.
                    La deuxième partie concerne la création de la maquette de notre site." title="Projet de création d'un site web : Cliquer sur image" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/web/Portfolio-Quentin-web-1.pdf"}></FenetreProjetWeb>, document.querySelector(".window"))
                }
                document.querySelector(".window").classList.remove("cacher")
                document.querySelector(".icofont-close-line-circled").addEventListener("click", () => {
                    userItem.classList.remove("retourner")
                    ReactDOM.render(<FenetreProjetWeb image={""} text="" title="" link=""></FenetreProjetWeb>, document.querySelector(".window"))
                    document.querySelector(".window").classList.add("cacher")
                })
            }, 2000);
        })
    })
})
buttonLinux.addEventListener("click", desactiver)
buttonLinux.addEventListener("click", () => {
    buttonLinux.classList.add("active")
    buttonLinux.classList.add("up")
    listprojet.classList.add("colorLinux")
    ReactDOM.render(<ProjetLinux />, listprojet)
    var resume = document.querySelectorAll(".resumer")
    resume[0].innerHTML = "Installation machine virtuelle <i class='icofont-check'></i>"
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
                    ReactDOM.render(<FenetreProjet image={"./images/Linux/installerPoste.jpg"} text="Le projet est une installation de poste pour un client souhaitant que nous lui configurions une Machine Virtuelle pour son équipe de développeurs utilisant golang pour du développement de jeux vidéo. Ce projet nous a permis de développer nos capacités d’administrateur machine comme par exemple créer des utilisateurs, installer certains programmes et surtout configurer une machine et son environnement pour qu’elle soit fonctionnelle." title="Installation d'un Poste pour un Client" url={"https://github.com/atari643/atari643.github.io/raw/rendu/pdf/setup/Portfolio-Quentin-setup-1.pdf"}></FenetreProjet>, document.querySelector(".window"))
                }
                document.querySelector(".window").classList.remove("cacher")
                document.querySelector(".icofont-close-line-circled").addEventListener("click", () => {
                    ReactDOM.render(<FenetreProjet image={""} text="" title=""></FenetreProjet>, document.querySelector(".window"))
                    document.querySelector(".window").classList.add("cacher")
                    userItem.classList.remove("retourner")
                })
            }, 2000);
        })
    })
});
// buttonRS.addEventListener("click", desactiver)
// buttonRS.addEventListener("click", () => {
//     buttonRS.classList.add("active")
//     listprojet.classList.add("colorRS")
//     buttonRS.classList.add("up")
//     ReactDOM.render(<ProjetRS />, listprojet)
// })
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