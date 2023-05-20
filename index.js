var buttonJava = document.getElementById("java")
var buttonC = document.getElementById("C")
var buttonHCJ = document.getElementById("HCJ")
var buttonPython = document.getElementById("Python")
var buttonLinux = document.getElementById("Linux")
var buttonMDP = document.getElementById("MDP")
var buttonBD = document.getElementById("BD")
var buttonRS = document.getElementById("RS")
var allbutton = document.querySelectorAll("nav div")
var listprojet = document.querySelector(".projet")
var Portfolio = document.querySelector(".portFolio")
var contact = document.getElementById("list")
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
            <img class='image odomo' src='./images/java/projet-1/odomo.png' alt='odomo' />,
            <img class='image biosphère' src='./images/java/projet-2/tableBiosphère.png' alt='Biosphère' />,
        ]
        const java = <img class='logo' src='./images/java/javalogo.png' alt='javalogo'></img>
        const lis = items.map(item => <div><li><h1 class="resumer"></h1>{java}{item}</li><i class="icofont-expand icofont-2x"></i></div>)
        return <ul>
            <ItemProjet logo={java.props.src} altL={java.props.alt} type={items[0].props.class} image={items[0].props.src} altP={items[0].props.alt} title="OK"></ItemProjet>
            <ItemProjet logo={java.props.src} altL={java.props.alt} type={items[0].props.class} image={items[0].props.src} altP={items[0].props.alt} title="OK"></ItemProjet>
            <ItemProjet logo={java.props.src} altL={java.props.alt} type={items[0].props.class} image={items[0].props.src} altP={items[0].props.alt} title="OK"></ItemProjet>
        </ul>
    }
}

class ItemProjet extends React.Component {
    render(){
        const logo = <img className='logo' src={this.props.logo} alt={this.props.altL}></img>
        const projet = <img className={this.props.type} src={this.props.image} alt={this.props.altP} />
        return <li className="content">
            <h1 className="resumer">{this.props.title}<i class='icofont-check'></i></h1>{logo}{projet}
            </li>
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
        ]
        const HCJ = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><li>{HCJ}{item}</li><i class="icofont-close"></i><i class="icofont-expand"></i></div>)
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
        ]
        const BD = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><li>{BD}{item}</li><i class="icofont-close"></i><i class="icofont-expand"></i></div>)
        return <ul>
            {lis}
        </ul>
    }
}
class ProjetLinux extends React.Component {
    render() {
        const items = [
        ]
        const Linux = <img class='logo' src='./images/java/javalogo.png' alt='javalogo' />
        const lis = items.map(item => <div><li>{Linux}{item}</li><i class="icofont-close"></i><i class="icofont-expand"></i></div>)
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
buttonJava.addEventListener("click", () => {
    listprojet.classList.add("colorJava")
    buttonJava.classList.add("up")
    ReactDOM.render(<ProjetJava />, listprojet)
    var resume = document.querySelectorAll(".resumer")
    resume[0].innerHTML="Completer un projet en cours <i class='icofont-check'></i>"
    resume[1].innerHTML="Créer une IA à partir de rien <i class='icofont-check'></i>"
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
        if(userItem.parentElement.firstChild.lastChild.src=="https://atari643.github.io/images/java/projet-1/odomo.png"){
        ReactDOM.render(<FenetreProjet image={"./images/java/projet-1/projet-odomo.png"} text="Dans le projet odomo une grande difficulté c’était le sens de lecture dès valeur dans un tableau ou une matrice. La façon donc les valeurs sont agencés n’est pas forcément comment on aimerait les afficher. J’ai réussi à faire que pour chaque histogramme selon son ordre de lecture, les valeurs se rangent dans l’ordre attendu.
        La lecture un tableau/matrice était essentiel dans la réalisation de ce projet" title="Projet météorologique" url={"https://github.com/atari643/atari643.github.io/raw/main/pdf/java/Portfolio-Quentin-java-1.pdf"}></FenetreProjet>, document.querySelector(".window"))
        }else if(userItem.parentElement.firstChild.lastChild.src=="https://atari643.github.io/images/java/projet-2/tableBiosph%C3%A8re.png"){
            ReactDOM.render(<FenetreProjet image={"./images/java/projet-2/projet-biosphère.png"} text="Le projet se nomme Biosphère7 qui est écrit en java. C’est un jeu de plateau à 15 niveaux  qui permet d’effectuer différentes actions selon les règles du niveau qui se cumule. Ma contribution est la réalisation,
            jusqu’au niveau 11, du tableau des actions possibles selon les nouvelles règles de chaque niveau. La deuxième partie du projet a été pour moi la plus enrichissante avec l’implémentation d’une IA avec le choix de la méthode à suivre, 
            et j’ai réussi à faire une méthode d’apprentissage par renforcement avec un algorithme QLearning (off policy). " title="Projet conception d'un jeu et une IA" url={"https://github.com/atari643/atari643.github.io/raw/main/pdf/java/Portfolio-Quentin-java-2.pdf"}></FenetreProjet>, document.querySelector(".window"))
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
buttonRS
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
    ReactDOM.render(<ProjetPy />, listprojet)
})
buttonMDP.addEventListener("click", desactiver)
buttonMDP.addEventListener("click", () => {
    buttonMDP.classList.add("active")
    buttonMDP.classList.add("up")
    listprojet.classList.add("colorMDP")
    ReactDOM.render(<ProjetMDP />, listprojet)
})
buttonBD.addEventListener("click", desactiver)
buttonBD.addEventListener("click", () => {
    buttonBD.classList.add("active")
    buttonBD.classList.add("up")
    listprojet.classList.add("colorBD")
    ReactDOM.render(<ProjetBD />, listprojet)
})
buttonHCJ.addEventListener("click", desactiver)
buttonHCJ.addEventListener("click", () => {
    buttonHCJ.classList.add("active")
    buttonHCJ.classList.add("up")
    listprojet.classList.add("colorHCJ")
    ReactDOM.render(<ProjetHCJ />, listprojet)
})
buttonLinux.addEventListener("click", desactiver)
buttonLinux.addEventListener("click", () => {
    buttonLinux.classList.add("active")
    buttonLinux.classList.add("up")
    listprojet.classList.add("colorLinux")
    ReactDOM.render(<ProjetLinux />, listprojet)
})
buttonRS.addEventListener("click", desactiver)
buttonRS.addEventListener("click", () => {
    buttonRS.classList.add("active")
    listprojet.classList.add("colorRS")
    buttonRS.classList.add("up")
    ReactDOM.render(<ProjetRS />, listprojet)
})
contact.addEventListener("click", ()=>{
    var lien = document.querySelector(".lien")
    if( lien.classList[1]=="enroule"){
        lien.classList.remove("enroule")
        lien.classList.add("dérouler")
        contact.classList.remove("remonte")
        contact.classList.add("decendre")
        document.querySelector("#list i").classList.add("icofont-rotate-180")
    }else{
        lien.classList.remove("dérouler")
        lien.classList.add("enroule")
        contact.classList.remove("decendre")
        contact.classList.add("remonte")
        document.querySelector("#list i").classList.remove("icofont-rotate-180")
    }
})