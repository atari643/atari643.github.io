# **Report: Installation of network services**

![img](images/computer2.png "image_de_couverture")

by ARTIGALA Quentin, AUBIER Clément

## **Table of contents**

<!-- 1. **A need, a configuration** -->

1. [A need, a configuration](#a-need-a-configuration)
   1. [Who are we?](#who-are-we)
   2. [Client’s need](#clients-need)
   3. [Software review](#software-review)
   4. [Prerequisites](#prerequisites)
2. [System and network configuration](#system-and-network-configuration)
   1. [User management](#user-management)
      1. [Why create new users?](#why-create-new-users)
      2. [Manipulations](#manipulations)
   2. [Administration of local networks](#administration-of-local-networks)
      1. [Addressing Planning](#addressing-planning)
      2. [Dynamic and static configurations, what are the differences?](#dynamic-and-static-configurations,-what-are-the-differences)
      3. [Testing the connection](#testing-the-connection)
      4. [Dynamic configuration](#dynamic-configuration)
      5. [Static configuration](#static-configuration)
   3. [Servers’ installation et configuration](#servers-installation-et-configuration)
      1. [NextCloud installation](#nextcloud-installation)
      2. [NextCloud configuration](#nextcloud-configuration)
      3. [OnlyOffice installation](#onlyoffice-installation)
      4. [NextCloud Plugin Installation](#nextcloud-plugin-installation)
   4. [Clients’ installation and configuration](#clients-installation-and-configuration)
3. [Portfolio](#portfolio)
   1. [A. Quentin](#a-quentin)
   2. [A. Clement](#a-clement)

## **A need, a configuration**

---

> In this first chapter, we are going to see the **assigned mission** and **client’s needs** that we will have to deal with. We will also detail the **environment**, as well as the **tools** used.

---

### **Who are we?**

This technical document was made by 2 students in IT, at the IUT of Bordeaux in S2B : **ARTIGALA Quentin** and **AUBIER Clément**. It should teach you to **configure a network** step by step. M. ARTIGALA was the technician of this project : he experienced and **realized the installation**. Then M. AUBIER mainly **wrote the tutorial**, according to what was made by his colleague.

### **Client’s need**

We were asked to **configure a network** that allows some clients to connect to a server. Thanks to this, clients can have access to an **online suite** and work in a team. We’ll only consider 2 clients to simplify the process : Bob and Alice. That’s why the network is divided into **2 subnets** : one for the **clients** and the other for **server hosting**. Between these 2 subnets, a **router** links them together in addition to being a gateway to access to the internet.

For the moment, all the computers are **blank**, with only a **Linux OS** installed on them. So we’ll have to configure all of them to be ready for use by the clients. Here is what the network described above can look like:

![img](images/network.jpg)

### **Software review**

To allow clients to work with **office automation**, 2 machines on the _server_ subnet host 1 service each. The first one hosts **NextCloud**, which is a free software file hosting and collaboration site. It will allow us to store the files edited by the clients. On the second one, the **OnlyOffice** online suite will be installed. It will allow the clients to edit text files, spreadsheets or even slideshows directly in their web browser. Those services are **indispensable** for any good company. So let’s see how to configure this kind of network.

### **Prerequisites**

In order to simulate the client’s needs, we are going to use the open source software called **NEmu**. It allows **simulating a network** on a single physical computer by linking several virtual machines together. By the way, we’ll use **QEMU** to emulate virtual machines.

To **launch NEmu** and start the network simulation, just type in a regular terminal :

> `$ ~/iut-vms/vnet/nemu-vnet ncloud`

Normally, it will **start the rooter** virtual machine, showing his command prompt. It's this terminal that we are going to configure the **router's IP** address. Now, to start both clients computers Bob and Alice, type in the principal **NEmu** terminal :

> `$ cli()`

Always in this **same terminal**, we can also **start server’s machines** _ncloud_ and _office_ by typing:

> `$ srv()`

![img](images/Arborescence%20lancement.jpg)

## **System and network configuration**

---

> In this second chapter, we are going to see how to **configure the network** so that the machines can **communicate** each other. This step includes the **assignment of IP addresses** of machines, **subnets maks**, **gateways** and much more. But this chapter also includes **creating users** and **testing** the connection.

---

### **User management**

**<h4 id="why-create-new-users" style="color:#3d85c6">Why create new users?</h4>**

First of all, we have to create **new users** of the client machines. Indeed, for the moment, there’s only an **administrator** account for each of them. That’s why, after being logged as root, for each machine, we are going to create the **associated user**. Then we’ll add this user to the list of **privileged users** so we’ll be able to execute **high-level** access command lines with this user.

**<h4 id="manipulations" style="color:#3d85c6">Manipulations</h4>**

The **following instructions** have to be done on the _alice_ machine and the same ones will have to be done for the _bob_ computer. So go to _alice_ computer and **log in** as root by using the **"root"** login and the **"alice"** password.

First we’ll create a new user called **"alice"** by typing in the command prompt:

> `$ adduser alice`

Now you can **log in** to this account to verify if it has been created **successfully** using:

> `$ login alice`

Then, let’s add the **administrator rights** to alice. First we need to exit this account et **log in as root** once again.

> `$ exit`

To add alice to the **"sudo"** user group, we can use the following command:

> `$  usermod -a -G sudo alice`

Now we can **log in** again to alice’s account and check if it is a part of the **"sudo"** group by using the **_id_** command like this:

> `$ login alice` >`$ id alice`

![img](images/make%20bob%20alice.jpg)

If all **goes well**, you should be able to **run a command** as an administrator by prefixing the commands by **_sudo_**. For example, let’s display the current user login:

> `$ sudo whoami`

Here we go, it's as simple as that to **create** a user! Feel free to do the same for _bob_! For your information, the **_sudo_** command is a command that allows you to **access features** that have been considered **"restricted"** by the system administrator.

It’s also a **group** on the computer, and the users who are part of it have **high privileges**. It allows them to make **system modifications** such as install new softwares, create new users, etc… By adding the **_sudo_** prefix before any command, this one will be **executed** as an administrator.

![img](images/check%20sudo.jpg)

### **Administration of local networks**

**<h4 id="addressing-planning" style="color:#3d85c6">Addressing Planning</h4>**

Now we can move on to **network configuration**. First, you should know that the machines on the _client_ subnet are **connected** to each other through a **switch**. In the same way, those on the **server subnet** are connected to a second **switch**. The two switches are connected to each other through the **router**, allowing these two subnets to **communicate** with each other.

To begin, it’s important to know that **IPv4 network addresses** are coded on **32 bits**. In this way, in a **/24** network, **24** bits are **reserved** and in common for each machine **belonging to a network**. These 24 bits determine to which network a machine belongs, and it’s called the **network address**. The remaining **8** bits, for a subnet mask of **255.255.255.0**, are reserved to identify the machine on a specific network. It’s called the **host address**.

To divide our network into **2 subnets**, we’ll choose a subnet mask of type **255.255.0.0**. This means that in the IP address of each machine on the network, the first **16** bits will **identify the networks** and will be the same. In a local network, the first **16** bits are usually **"192.168"**. Then, the next **8** bits will be common to machines within the **same subnet**. Finally, the last **8** bits will be different for **each machine**, allowing them to be distinguished from each other.

Now, we’ll be able to determine the **IP addresses** for both switches belonging to **192.168.0.0/16**. For example, let’s take those:

- **Switch Client** : 192.168.1.0/24
- **Switch Serveur** : 192.168.2.0/24

Each machine from a network owns at least **one interface** (noted ‘eth’) thanks to which it’s **identified** on the network. In our case, all the machines have **one** that we'll use, except the **router**, which has **3**. Indeed, it acts like a **gateway** between the **client** and **server** subnets. Furthermore, it has an interface to connect it to the **internet**. We won’t take care of it in this tutorial.

To make it easier, we made a table **summarizing** an example of IP address for each **interface** of the network, in order to respond to our situation. **Take a look** at it!

| Interface                             | Generic address | Chosen address |
| ------------------------------------- | --------------- | -------------- |
| eth0 router (towards server’s subnet) | 192.168.10.254  | 192.168.10.254 |
| eth1 router (towards client’s subnet) | 192.168.20.254  | 192.168.20.254 |
| eth0 alice                            | 192.168.20.x    | 192.168.20.100 |
| eth0 bob                              | 192.168.20.x    | 192.168.20.200 |
| eth0 office                           | 192.168.10.x    | 192.168.10.100 |
| eth0 ncloud                           | 192.168.10.x    | 192.168.10.200 |

**<h4 id="dynamic-and-static-configurations,-what-are-the-differences" style="color:#3d85c6">Dynamic and static configurations, what are the differences?</h4>**

Now that we have chosen the **IP addresses** to assign to our machines, let’s move on to the practical aspect by **configuring the machines** using commands. First, we need to distinguish between 2 types of configurations: the **dynamic** one and the **static** one.

The **dynamic** configuration is a **temporary** configuration of the network. That is to say that the IP addresses are assigned **ephemerally during a session**. That’s why if we **reboot** the computer, the dynamic configuration is **reset** and the network must be configured again. This type of configuration is particularly used for **testing** purposes.
For example, we can use it to add an **external component**, such as a computer, **temporarily** to a network. The dynamic configuration will allow us to see if the machine is **correctly configured** and if it can be really integrated in the **final** network (called static). This avoids directly modifying the current network and causing **irreversible problems**.

On the other hand, the **static** configuration is the **long-term** configuration of the network. This means that even **after rebooting** a machine, this configuration will **remain effective**. It’s a configuration that is intended for **constant use** of a network. Consequently, it’s necessary to **manipulate** this configuration **with care**.

**<h4 id="testing-the-connection" style="color:#F32F0C">⚠️ Testing the connection ⚠️</h4>**

Before processing **any manipulation** of the network,this part will teach you how to **test the connection** between 2 machines on the network using different methods. In particular, you will have to do these operations to **check if everythings works** after the dynamic or the static configuration. If you want to directly **skip** one of the 2 configurations for some reason, this part will be **useful** to you anyways.

Well, we have different ways to test the connection between 2 machines. First we can use the **_ping_** command. It's used to **verify** if a connection between two machines can be **established**. It will help us ensure that our configuration is correct. For example, we can **check** the **connection** between _alice_ and _ncloud_ by typing in the prompt of _alice_:

> `$ ping 192.168.10.100`

This will send **4 packets** from the machine where the command is typed, to the machine with the **specified IP address**. You should get a result of **0 packets lost**. If it’s not the case, that means that the connection **cannot** be **established**. So, maybe you made some **mistakes** in the network configuration.

You can also test the connection by using the **_ssh_** command. This one allows you to **connect** to the **user** of a **remote machine** using the terminal. From an addressing point of view, it’s used in the **same way** as **_ping_**. However, in addition to IP address, the **user** to be connected to must be **specified**. For example, on _alice_, you can type

> `$ ssh bob@192.168.20.200`

to connect to bob's **remote session**.

Finally, if you want to know **which path** a **packet took** to get from machine **A** to machine **B**, you can use the **_traceroute_** command instead of **_ping_**. It will show you the **list of routers** the packet used to get to its **destination**. So, type

> `$ traceroute 192.168.10.10`

on _alice_ to see which **router** the packet **went through** to get from _alice_ to _ncloud_.

There we go, that was the **3** most used **commands** to **test** the connection between 2 machines. **Feel free** to come back to this part and use these commands at **any time**!

**<h4 id="dynamic-configuration" style="color:#3d85c6">Dynamic configuration</h4>**

First of all, we are going to set up a **dynamic configuration** for our network in order to see if the IP addresses chosen before are **correct** for our network.

In the command **prompt** of one of the 5 machines (router, bob, alice, ncloud or office), we can type

> `$ ip -br addr`

to **visualize succinctly** the **interfaces** of the machine. Type

> `$ ifconfig -a`

to display **more details**.

![img](images/start%20config%20network.jpg)

You will notice that **each machine** has an interface called **"lo"** with the address **127.0.0.1**. This interface is present on almost all machines, and is called the **loopback interface**. It’s used by the machine to **send packets to itself**, without going through an external interface. In particular, it allows the machine to **contact itself** locally. That’s why, by default, the **localhost** address corresponds to the IP address **127.0.0.1**. However, this address can be modified.

We can now **change** the **IP addresses** associated with each machine and put those we have chosen. Now, we’ll explain the steps to **configure** the _alice_ machine. We’ll need to do the **same for each machine** on the network, modifying the assigned IP addresses.

To begin, open the **terminal** on the _alice_ machine and type

> `$ ifconfig -a`

to **list the interfaces** that are present on the machine.

You should see **"eth0"** appear, which corresponds to **interface 0**. For _alice_, we only need to **modify** this interface.

Type

> `$ ifconfig eth0 192.168.20.10 netmask 255.255.255.0`

to **change** the IP address of alice's interface 0 to **192.168.20.10**.

We also specify that the **subnet mask** is **255.255.255.0**. Indeed, on our subnets, only the **last octet** will be dedicated to the **machine's own address**. Type

> `$ ifconfig`

to check that **"eth0"** appears in the terminal. In fact, this command only lists the interfaces that are **currently active**. If it's **not** the case, **turn it on** by typing

> `$ ifconfig eth0 up`

You can **turn off** the **interface** at any time by typing

> `$ ifconfig eth0 down`.

**Repeat** this process for each interface on **each machine** on the network, including the **router**, always using **255.255.255.0** as the subnet mask.

![img](images/eth0%20and%20eth1%20router.jpg)

![img](images/eth0%20config%20alice%20bob%20ncloud%20office.jpg)

Now we can **try** if the **connection** works. To do this, you can refer to the **[dedicated part](#testing-the-connection)** of the tutorial. But basically, type

> `$ ping 192.168.20.200`

on the _alice_ machine to **test** the connection between _alice_ and _bob_ for example. **Repeat the process** from _bob_ to _alice_, from _ncloud_ to _office_, and from _office_ to _ncloud_.

However, you may notice that it’s **impossible** for 2 machines on **different subnets**, such as _alice_ and _ncloud_, to communicate with each other. Don’t worry, it’s completely **normal**! By default, the **router** is configured to **reject packets** that aren’t **directly addressed** to it.

To **fix** this **issue**, we need to **execute** the following command on the _router_ machine:

> `$echo 1 > /proc/sys/net/ipv4/ip_forward`

This will **tell** the **router** to **forward packets** that aren’t directly **intended** for it.

Nevertheless, you’ll **notice** that we still can’t make _alice_ and _ncloud_ **communicate**. That’s because we haven’t configured their **gateway** yet. For a computer, the **gateway** is the IP address of the **router's interface** to which a **packet** is **sent** if its **destination** is not in the **same subnet** as the sending machine. So, we need to **configure** the gateway on **all machines** except the **router** (alice, bob, ncloud, and office).

To see **all** the **configured gateways** on a machine, we can use the command:

> `$ ip route`

For **both machines** on the **client** subnet, we have to type:

> `$ ip route add default via 192.168.20.254`.

This command **tells** the computers that their **default gateway** is the **router's interface 1** (the one connected to the client network).

If you want to **remove** this **gateway**, use the command

> `$ ip route del default via 192.168.20.254`.

Similarly, we need to **enter** the command

> `$ ip route add default via 192.168.10.254`

on the **two machines** on the **server** subnet.

This will **configure** their **default gateway** as the **router's interface 2** (the one connected to the server network).

![img](images/gateway.png)

Alright, the **dynamic** network that we just configured is now **operational**! However, if we reboot each machine using

> `$ reboot`

in their terminal, as expected, the **configuration** has been **reset**. For example, if we go on the _alice_ terminal and we type

> `$ ifconfig -a`

, we can see that the **"eth0"** interface is **no longer configured**. Indeed, **addresses** and **routing tables** have been totally **reset**.

**<h4 id="static-configuration" style="color:#3d85c6">Static configuration</h4>**

In a second time, we’ll learn how to **set up** a **static configuration**. Indeed, the dynamic configuration doesn’t allow us to **keep the addressing** after the **reboot** of a machine. To do this, we will **store** our configurations in a **special file** on each machine that will be read at each **startup**.

To access this **file** and **modify** it, type in the terminal of a machine, for example, _alice_:

> `$ sudo nano /etc/network/interfaces`

The **_nano_** command will **open** the **"interfaces"** storage **file** in a **minimalist text editor** in the console. You can simply type in text, then press **Ctrl+S** to save and **Ctrl+X** to exit.

If all goes well, when you open this file, there should **already** be some **data** that you **shouldn’t modify**. We’ll simply need to **add** a **few lines** of **settings** for each interface on the machine. For **each interface** on each machine, write at the **end** of this file:

![img](images/screen%20terminal%20static.jpg)

After writing the **configuration** of an interface, we have to **start** it. In our example, type

> `$ ifup eth0`

in the command **prompt** to start the **interface 0** that we just configured.

It’s also possible to **shut down** this **interface** by typing

> `$ ifdown eth0`.

In this way, it will **no longer** be **active** and the associated computer we’ll be **disconnected** from the **network**. Repeat this process for **all** the **machines**. However, pay **attention** to the **router**: it **already knows** all the subnets and **doesn’t require** any **gateway**! So it’s useless to write the **"gateway"** line for each interface of the router.

Nevertheless, the **router** has a **specificity**. Indeed, as for the dynamic configuration, by default, it doesn’t **forward** packets that aren’t directly **intended** for it. To allow communication between machines on different subnets with a static configuration, we need to **specify** to each interface of the router to **forward** the **packets**.

To do this, **add** the following command below the **"netmask"** line of each interface in the **"interfaces"** file of the router:

> `$ up echo 1 > /proc/sys/net/ipv4/ip_forward`.

Alright, we come to the end of this chapter. We only need to **test** the configuration by doing some **_ping_** between 2 machines in the same subnet and between machines in different subnets. We can also type **_ifconfig_** and check if the IP addresses of each machine are those **expected**. Take a look at the **[testing part of the tutorial](#testing-the-connection)** if you have any doubt.

Now, we can also **turn off** the network **interfaces** of each machine and **turn** them back **on** with the command

> `$ ifup eth0 && ifdown eth0` for example.

After **restarting** the machines with the

> `$ reboot`

command in their terminal, you’ll see that the configuration **still works** and hasn't been **reset** like a dynamic configuration.

### **Servers’ installation et configuration**

Alright, we finished the **network** configuration! We can move on the **installation** of the **servers**. Indeed, they should allow clients to **connect** and be able to do **office work** online. However, for the moment, the _ncloud_ and _office_ machines have **no software** installed and are quite ordinary machines.

**<h4 id="nextcloud-installation" style="color:#3d85c6">NextCloud installation</h4>**

First, we’ll start by **installing NextCloud**, the file **hosting** service. To do so, we’ll work on the _ncloud_ **machine**. **All** the following operations will be **performed** only on this machine.

Firstly, it's important to understand the concept of **"package manager"**. Indeed, on a **Linux** distribution, the installation of software is done via these managers, which allow for **installation**, **updating**, or even **deletion** of software on the system.
Managers also handle the installation of **dependencies**. That means that if we want to download software that **requires** other softwares to be installed beforehand, these softwares will be **automatically installed**. To do this, the package manager will download installation files for different software from associated online **repositories**.

Each Linux distribution has **one** or **several** package managers that allow the installation of software. For example, on **Debian** and its derivatives such as **Ubuntu, Mint**, etc., the most popular manager is **"apt"**. Advanced Packaging Tool was originally designed to work with **_.deb_** packages on Debian distributions. It’s now used on many Linux distributions, thanks in part to the fact that its **repositories** have more than **10 000 available packages.** It has also been adapted to work on MacOS.

There are many **other** package managers available for different Linux distributions. For example, **Redhat**, **OpenSuse** and their derivatives use the **RPM** package manager. This consists of an **open format** and a free software for manipulating its files. **Fedora** uses **Dandified Yum**, which is a package manager for RPM-based distributions. Arch Linux, on the other hand, uses **Pacman**, which supports **binary files**. It makes the package management easier for **both official** or **user-created** packages.

Each package manager uses one or several specific **package formats**. For instance, **Dandified Yum** uses a **URL address** to retrieve its packages from the repository, **RPM** uses packages in the **RPM format**, and **Pacman** uses users repositories to fetch its packages, in particular the **libalpm library**.

There are also package managers available for **Windows**, although they _aren’t_ as **commonly** used as those for Linux distributions. For example, **Chocolatey** is a package manager for Windows that allows users to install sofwares using a **command prompt**. We can also enumerate **Winget** or the classic **“Windows Store”** made for Windows 10 and 11 that contains tons of applications exclusive for this platform. It uses the **“.appx”** file extension for its package that contains all necessary components of the installation application.

Furthermore, there are also many package managers on **MacOS**. In this way, the most popular one is **Homebrew**. It’s a software made by **Apple's community** developer that provides **open-source softwares** and **utilities** for Mac. It can handle dependencies and package updates. Moreover, we can also talk about some other package managers such as **MacPorts** and **Fink**.

For this tutorial, we'll briefly use _apt_ package manager. There are the most **used** commands to manipulate packages using this manager. You can use it directly in a **regular** terminal.

- `$ sudo apt update` : **refreshes** the **list** of **available packages** on the system. That ensures that the system has the latest package information.
- `$ apt search <package-name>` : **shows** all packages **corresponding** to the **name** you searched that are **disponible** on the repositories that are configured on your system.
- `$ apt-cache search <package-name>` : shows you, if the specified package **exists**, some additional **information** and **details** about it.
- `$ apt list --installed` : **lists** all the packages **installed** on the system
- `$ sudo apt install <package-name>` : **download** and **install** the specified package on your system.
- `$ sudo apt remove <package-name>` : **uninstall** a package from your system.
- `$ sudo apt upgrade` : **installs updates** for all installed packages on the system.

In this tutorial, we'll mainly use another package manager called **Snap**. Indeed, Snap allows the user to install an application and her dependencies with a **single package**. That’s why the installation process is **greatly simplified**. Furthermore, softwares installed using this command **runs** in a **dedicated environment**, apart from the conventional system executions. In that way, it reduces **malicious actions** because the software can’t access the host system without **permissions**.

First of all, before using **Snap**, we have to **install** it. We are going to use the **apt** manager.

> `$ sudo apt install snapd`

Such as apt, **Snap** has usual commands to manipulate packages. There are the most **common** that we need to know to make our configuration :

- `$ sudo snap refresh --list` : **refreshes** the **list** of **available packages** on the system. That ensures that the system has the latest package information.
- `$ snap find <package-name>` : **shows** all packages **corresponding** to the name you searched that are disponible on the repositories that are configured on your system.
- `$ snap info <package-name>` : shows you, if the specified package **exists**, some additional **information** and **details** about it.
- `$ snap list` : **lists** all the packages **installed** on the system
- `$ sudo snap install <package-name>` : **download** and **install** the specified package on your system.
- `$ sudo snap remove <package-name>` : **uninstall** a package from your system.
- `$ sudo snap refresh` : **installs updates** for all installed packages on the system.

Now that we know this, we can start the installation of **NextCloud** on the _ncloud_ server. To do this, type the following command in the terminal to install **NextCloud** packages using **Snap** :

> `$ sudo snap install nextcloud`

After this, we have to connect to our **nextcloud** account. That’s why we are going to need a **graphic interface** to go on a **web browser**. You can easily **switch** the system to graphic mode by typing in the console :

> `$ startx`

![img](images/ncloud%20debian.jpg)

In fact, that it run **XFCE**, the desktop environment installed on the virtual machine. Now, **open** a **web browser**, such as Firefox, by opening the activity center of the OS and typing **“Firefox”**. Then we have to type the **IP address** of the machine that we want to connect in the url **search bar**. In our case, it’s **“192.168.10.100”**.

It will **redirect** us on the connection page of **Nextcloud**. Now you can **create** an **administrator account** for the application, by choosing an **username** and a **password**. Once the account is created, you can **connect** to it. In our case, we are going to use the username **“admin”** and the password **“admin”**, but you can choose whatever you want.

![img](images/affichage%20ncloud.jpg)

**<h4 id="nextcloud-configuration" style="color:#3d85c6">NextCloud configuration</h4>**

Well, now NextCloud is **installed** on the **server**, but we have to **configure** it. First of all, we are going to allow **non-registered** users to **share** documents using simple share **links** protected by a password. To do this, go ahead and click on the **profile picture** in the top right corner, then choose **“admin settings”**. After this, click on the **burger menu** in the top left corner, then scroll down until you see the **“Share”** button. Click on it, then check the box **“always ask for a password”**.

![img](images/nexcloud%20link%20password.jpg)

Then, we also have to make sure that **users** don’t use **weak passwords**. That’s why we will impose **lowercase**, **uppercase** and **digits** in the password. To **apply** these measures, we have to click on the **“Security”** button in the left menu. Then tick the boxes **“impose lowercase and uppercase characters”** and **“impose numbers”**.

Finally, let’s activate the password verification on the **haveibeenpwned** database by ticking the **“check the password against the list of understood passwords on haveibeenpwned”** button . Haveibeenpwned is a free online service that allows users to check if their **personal data** has been **compromised** in data breaches. If it’s the case for the passwords used by the accounts on the server, the user will be **notified**.

![img](images/ncloud%20password.png)

Now, we can create a **group** of users, for the **IUT** users for example. Click on the **profile picture** again, then choose **“users”**. Click on **“add a group”** and create a new group called “IUT”. Then we can add some users in this group, who will be able to **work together**. On the same page, click on **“New user”** then fill in the form. For example, if you want to create a user called **“alice”** who is part of the “IUT” group and even **administrator** of it, and who has a maximum of **512MB** of storage, you can fill it like this:

![img](images/make%20a%20group.png)

![img](images/make%20user.jpg)

Create another user called **bob**, who is part of the **“IUT”** group and who has only **128MB** of storage. You can choose whatever password you want, but it should be **strong** enough. For our example, we are going to use the same password for both users: **“G5jiHjyLhMmV6ac!”**.

Furthermore, we can **personalize** alice’s and bob’s accounts. Click on the **profile picture** in the top right corner, then click on **“logout”**. Now type the login of alice and her password for example. You are going to be redirected to her **NextCloud** account. Here, you can play around and change her profile picture or her username.

Now, what we can do is create a **shared folder** that allows all the members of the IUT group to **read** and **modify** files from this folder. This way, Bob and Alice we’ll be able to **work together**. For instance, from Alice's account, click on the **"folder"** icon at the top left of the screen. Now click on the **"plus"** button, then click on **"New folder"** and give it a name.
In the list of folders that appears, click on the **"share"** button on the right of the folder you just created, then add the **"IUT"** group to the share. That’s it! Now you can logout then login to Bob’s account. Click on the **"folder"** icon again, and now you can see that the shared folder appears in the list. You can click on it, **add** a file, **modify** a file or whatever you want.

![img](images/Alice%20new%20folder%20share.jpg)

![img](images/check%20bob.jpg)

But, there’s **another way** to share some files. Indeed, using the previous method, only members with a **registered account** can access shared folders. But we can also create public links to a specific file. For instance, log in with Alice’s account and click on the **"folder"** button then click on the **share** button next to a certain folder as we did before. Now you can choose the **"share link"** option. Check **"password protect"** then type a secure password.

Now, anyone can type the **url** of the shared file on their browser, but they must type the **correct password** to **access** it. To verify if it works, you can get the link by clicking on the **"clipboard"** button next to the **"share link"** button. Now log out, and type this url in the browser. You 'll be asked to type a **password** before accessing the file. But now, there’s another little **problem**. In fact, we **can’t edit files** directly from NextCloud’s interface. That’s because NextCloud is just a **hosting** service to store some files, but it’s not an **office suite** that allows you to edit contents. That’s why we are going to need one, called **OnlyOffice**.

![img](images/lien%20other%20counte.jpg)

**<h4 id="onlyoffice-installation" style="color:#3d85c6">OnlyOffice installation</h4>**

**OnlyOffice** is a **web service** such as **Microsoft Office** / **Libre Office** that allows **editing documents online**. For our configuration, we are going to install OnlyOffice on a different machine from NextCloud to avoid an **overload** on the same server. Then we’ll connect the 2 services using a NextCloud **plugin**. From now, we’ll work on the _office_ machine.

First, let’s **install OnlyOffice** on the computer using the command prompt:

> `$ sudo snap install onlyoffice-ds`.

If **"snap"** isn’t already installed on the computer, just type

> `$ sudo apt-get install snap` to install this package manager.

Now we have to **securise** the access to our **OnlyOffice** service by generating a **secret key**. You can choose any key, including **alphanumeric characters** or whatever. Remember: the more **various** characters the key contains, the **stronger** it is. For our example, we are going to use a very **simple** key that is **"123456"**.

Now to **assign** it to OnlyOffice type:

> `$ snap set onlyoffice-ds onlyoffice jwt-secret=123456`

Obviously, you have to change **"123456"** by your own key.

> Then enable the key verification to the service by typing : `$ snap set onlyoffice-ds onlyoffice jwt-enabled=true`.

Alright, now all should be fine. Open a **web browser** on this same machine, and type in the url bar: **192.168.10.100**. This IP address corresponds to the one we have chosen to assign to the _office_ computer on the **server LAN**. So it might be different for you, but in all cases, you should have a page saying **"ONLYOFFICE Docs Community installed"**. If it isn’t the case, you might **try again** this important part of the tutorial.

**<h4 id="nextcloud-plugin-installation" style="color:#3d85c6">NextCloud Plugin Installation</h4>**

Well, now let’s **integrate** OnlyOffice with NextCloud. Do to this, you can use any of the **4 machines**, as long as you are logged to NextCloud as **administrator**. For reminder, we created the administrator account when we **first connected** to NextCloud on the _ncloud_ computer. We used **"admin"** for login and password as well. Once connected, we’ll add some **plugins** to our server by clicking on the **profile picture** on the top right corner.

Then choose the **"+ Applications"** button in the drop-down menu. Finally, click on the **"highlighted applications"** button to have access to the list of **predefined plugins** for NextCloud. A plugin is a **module**, a little application, that is an **extension** for another application that adds additional **functionalities**. In our case, NextCloud plugins allow us to personalize the collaborative platform to our specific **needs**. NextCloud offers an **"in-app shop"** that suggests a lot of useful plugins. Let’s install **OnlyOffice** by searching it in the list and by clicking on the **"download and activate"** button by the side.

![img](images/installation%20plugin%20nextcloud.jpg)

First of all, the **address** of the server which hosts **OnlyOffice** we’ll be **asked**. In our case, the IP address of the _office_ machine is **192.168.10.100**. Don’t forget to format it like this **"http://192.168.10.100/"**, by adding the _http_ protocol at the beginning. Well, you also have to write the **secure key** that we defined after the installation of OnlyOffice on the _office_ machine. In our case, it was **"123456"**.

You can click on **"advanced settings"** to choose which extensions will be associated with **OnlyOffice**. For instance, you can tick : **doc, docx, ppt, pptx, xls, xlsx, odp, ods, odt**. In this way, we’ll be able to **edit** these **files** using the OnlyOffice suite. Then you can click on the **"save"** button to validate. Now we can test if the plugin works by logging in with Bob or Alice, **creating** a **file** with one of those extensions, and trying to open it directly on the **web browser**. If all goes well, you should be able to **edit** the file with the OnlyOffice interface that appears.

![img](images/onlyoffice.jpg)

Alright, now, let’s make our NextCloud **look better**! To do this, we are going to install the **"Splash"** plugin. This one will display some random **nature photos** on the NextCloud **login page**. As we did before, you just have to login as administrator, go on **"+ Applications"**, then click on **"highlighted applications"** then find **"Splash"** in the list. A little tip that can be very useful : use the **"magnifying glass"** button on the top right to search for a specific plugin. Once you have installed it, you can log out, and admire a beautiful picture in the **background**!

![img](images/images/Splash.jpg)

Another useful plugin is **Draw.io**. This extension will allow users to **edit graphics** directly in the web browser. Once again, log in as administrator and search for the **"Draw.io"** plugin. Once installed, click on the **"magnifying glass"** button to search a file that contains a graphic, such as a **".ods"** file. If you don’t have one, you can create one by clicking on the **"folder"** button on the top left. Open this file, and you can now see that it’s possible to edit graphics.

![img](images/Draw.jpg)

All collaborative work requires an **organization**. That’s why you can install the **"Calendar"** plugin. Log in as administrator and install this plugin. Once installed, click on the **"magnifying glass"** again, and search for **"Calendar"**, then click on the button **"Agenda"** to open the calendar application. Click on the **"New agenda"** button to create a new agenda.

Give it a name such as **"IUT"**, and in the share section, add the **"IUT"** group. Check **"can modify"** for this group. Now if you log out and log in again with Bob or Alice, who are **members** of the IUT group, you can find this calendar using the **"magnifying glass"** button, and open it. Then you should be able to click on the **"New event"** button and add some contents in this agenda.

![img](images/Calendar.jpg)

It would be really nice if we could create **forms**… Hopefully a plugin called **"Forms"** exists! Install it using the administrator account. Now you can see in the menu bar a new icon **"form"**. Click on it to open this application and click on **"New form"** to create a new one.

![img](images/Form.jpg)

NextCloud has **tons** of **useful plugins** like these. Feel free to install those you want. For instance, we recommend you to install **NextCloud Note**, which is a very convenient way to quickly write some **ideas**. Moreover, **Mind Map** is a plugin that allows you to create and share **mind maps** very easily.

### **Clients’ installation and configuration**

Well, now all works fine. But some clients may want to **automatically synchronize** their **local files** to their NextCloud **online storage**. That allows users to access their files **without** using a **web browser** and without having to **manually download** and **upload** them each time. The **synchronization client for Nextcloud** is an application that **monitors** for **changes** and **updates** on the **local files** and **sends** them to the server automatically. We need to install this application on **each client** machine, using the accounts we created "bob" and "alice", not the root. For example, let’s make this installation for Bob, and you’ll be able to do the same for Alice.

First of all, we have to install the **NextCloud desktop client** by writing in a terminal of the _bob_ machine:

> `$sudo apt-get install nextcloud-desktop `.

Once installed, search for **"NextCloud synchronization client"** in the list of applications on the computer, and **open** it. Then click on **"add an account"** to allow synchronization between Bob’s computer and Bob’s online account. Then write the address of the web **NextCloud interface** you want to connect to. In our case, it’s _bob_, which has the address **"http://192.168.10.200"**. Now tick **"Synchronize all content from the server"** to automatically synchronize all folders and files.

You can also **choose** which files you want to synchronize by ticking **"Select the content to be synchronized"**. You can adjust some **settings** such as a confirmation request for synchronization of files larger than **500 MB**. Finally, you can choose the **location** of the local synchronized folder by modifying the **"local folder"** input. Finally, click on **"connection"** and that’s all. Now you can try to connect to Bob’s online account and **create files**. You’ll see that the files will **appear locally**. Reciprocally, if you modify some files locally, when you check files on the server, they will also be **modified**.

![img](images/sync.jpg)

![img](images/check%20dossier.jpg)

Alright, that's it! That's the **end** of this tutorial that shows you how to **create** your own **network** configuration easily. We hope you found it **useful**!

## **Portfolio**

### A. Quentin

Dans ce projet d'installation d'un service réseau, ma participation a été la configuration des utilisateurs, service réseau (nextcloud, onlyoffice) dans un réseau émulé.  Le projet m'a permis de mettre ma connaissance théorique d'une configuration réseau en pratique. Ainsi que la conception d'un descriptif détaillant l'ensemble de l'installation destinée à une compréhension sans pré-requis d'une installation réseau.

![img](images/network.jpg "immage portfolio Quentin")

### A. Clement

J’ai été invité à configurer un réseau virtuel et à mettre en place un service de bureautique en ligne. Cela m’a permis de comprendre concrètement le paramétrage d’un réseau sous Linux via les commandes associées. J’ai pu découvrir l'installation d'un serveur sur Linux ainsi que l'utilité des gestionnaires des paquets. Enfin, cela m'a appris à me coordonner en équipe afin de rédiger un livrable en anglais, structuré, et comportant des termes techniques. J’ai également pu acquérir les bases de la rédaction d’un document en markdown.

![img](images/portfolio_clement2.jpg "image portfolio clement")
