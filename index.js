var buttonJava = document.getElementById("java")
var buttonC = document.getElementById("C")
var buttonHCJ = document.getElementById("HCJ")
var buttonPython = document.getElementById("Python")
var buttonLinux = document.getElementById("Linux")
var buttonMDP = document.getElementById("MDP")
var buttonBD = document.getElementById("BD")
var allbutton = document.querySelectorAll("nav div")
var listprojet = document.querySelector(".projet")
var Portfolio = document.querySelector(".portFolio")
var contact = document.getElementById("Contact")
var sphere = document.querySelector(".sphere")
var all = document.querySelector(".page")
var afficher = document.querySelector("#afficher")

class Description extends React.Component{
    render(){
        return <div id="Description">
            <p>Passionner par l'informatique à l'âge de 10 ans, il cherche un moyen d'en apprendre toujours plus dans tous les langages.</p>
        </div>
    }
}
class ProjetJava extends React.Component {
    render() {
        const items = [
            <img class='image odomo' src='./images/odomo.png' alt='odomo' />,
            <img class='image biosphère' src='./images/tableBiosphère.png' alt='Biosphère' />,
        ]
        const java = <img class='logo' src='./images/javalogo.png' alt='javalogo'></img>
        const lis = items.map(item => <div><li>{java}{item}</li><i class="icofont-expand icofont-2x"></i></div>)
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
            <img class='big' src={this.props.image}></img>
            <p>{this.props.text}</p>
            <button class="Download"><i class="icofont-download"></i>Download</button>
        </div>
}
}
class ProjetC extends React.Component {
    render() {
        const items = [
        ]
        const C = <img class='logo' src='./images/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><li>{C}{item}</li><i class="icofont-close"></i><i class="icofont-expand"></i></div>)
        return <ul>
            {lis}
        </ul>
    }
}

afficher.addEventListener('click',()=>{
    ReactDOM.render(<Description/>, document.querySelector("#me"));
    document.querySelector("#me").classList.toggle("down");
})
function desactiver() {
    for (var i = 0; i < allbutton.length; i++) {

        allbutton[i].classList.remove("up");
        allbutton[i].style.setProperty('--h', 100 + '%')

    }
    listprojet.classList.remove("colorJava");
    listprojet.classList.remove("colorC")
    listprojet.classList.remove("colorPy")

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
buttonJava.addEventListener("click", () => {
    listprojet.classList.add("colorJava")
    buttonJava.classList.add("up")
    ReactDOM.render(<ProjetJava />, listprojet)
    var logo = document.querySelectorAll(".logo")
    setInterval(() => {
        for (var i = 0; i < logo.length; i++) {
            logo[i].classList.toggle("move")
        }
    }, 2000)
    var odomo = document.querySelector(".odomo")
    var open = document.querySelectorAll(".icofont-expand")
    open.forEach((userItem) => {
    userItem.addEventListener("click",()=>{
        if(userItem.parentElement.firstChild.lastChild.src=="https://atari643.github.io/images/odomo.png"){
        ReactDOM.render(<FenetreProjet image={"./images/projet-odomo.png"} text="Dans le projet odomo une grande difficulté c’était le sens de lecture dès valeur dans un tableau ou une matrice. La façon donc les valeurs sont agencés n’est pas forcément comment on aimerait les afficher. J’ai réussi à faire que pour chaque histogramme selon son ordre de lecture, les valeurs se rangent dans l’ordre attendu.
        La lecture un tableau/matrice était essentiel dans la réalisation de ce projet" title="Projet météorologique"></FenetreProjet>, document.querySelector(".window"))
        }else if(userItem.parentElement.firstChild.lastChild.src=="https://atari643.github.io/images/tableBiosph%C3%A8re.png"){
            ReactDOM.render(<FenetreProjet image={"./images/projet-biosphère.png"} text="Le projet se nomme Biosphère7 qui est écrit en java. C’est un jeu de plateau à 15 niveaux  qui permet d’effectuer différentes actions selon les règles du niveau qui se cumule. Ma contribution est la réalisation,
            jusqu’au niveau 11, du tableau des actions possibles selon les nouvelles règles de chaque niveau. La deuxième partie du projet a été pour moi la plus enrichissante avec l’implémentation d’une IA avec le choix de la méthode à suivre, 
            et j’ai réussi à faire une méthode d’apprentissage par renforcement avec un algorithme QLearning (off policy). " title="Projet conception d'un jeu et une IA"></FenetreProjet>, document.querySelector(".window"))
        }
        document.querySelector(".window").classList.remove("cacher")
        document.querySelector(".icofont-close-line-circled").addEventListener("click",()=>{
            ReactDOM.render(<FenetreProjet image={""} text="" title=""></FenetreProjet>, document.querySelector(".window"))
            document.querySelector(".window").classList.add("cacher")
        })
    })
})

    }
)
buttonC.addEventListener("click", desactiver)
buttonC.addEventListener("click", () => {
    buttonC.classList.add("active")
    listprojet.classList.add("colorC")
    buttonC.classList.add("up")
    ReactDOM.render(<ProjetC />, listprojet)
})
buttonPython.addEventListener("click", desactiver)
buttonPython.addEventListener("click", () => {
    buttonPython.classList.add("active")
    listprojet.classList.add("colorPy")
    buttonPython.classList.add("up")
    up(buttonPython)
})
buttonMDP.addEventListener("click", desactiver)
buttonMDP.addEventListener("click", () => {
    buttonMDP.classList.add("active")
    buttonMDP.classList.add("up")
    up(buttonMDP)
})
buttonBD.addEventListener("click", desactiver)
buttonBD.addEventListener("click", () => {
    buttonBD.classList.add("active")
    buttonBD.classList.add("up")
    up(buttonBD)
})
buttonHCJ.addEventListener("click", desactiver)
buttonHCJ.addEventListener("click", () => {
    buttonHCJ.classList.add("active")
    buttonHCJ.classList.add("up")
    up(buttonHCJ)
})
buttonLinux.addEventListener("click", desactiver)
buttonLinux.addEventListener("click", () => {
    buttonLinux.classList.add("active")
    buttonLinux.classList.add("up")
    up(buttonLinux)
})
contact.addEventListener("mouseover", () => {
    ligne.style.visibility = "visible"
    ligne.classList.add("souligner")


})
contact.addEventListener("mouseout", () => {
    ligne.style.visibility = "hidden"
    ligne.classList.remove("souligner")

})
