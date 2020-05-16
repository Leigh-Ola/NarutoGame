//captialize the first letter in a string
function capitol(str){
	str = str.trim();
	str = ((str.charAt(0).toUpperCase())+(str.substr(1)));
	return str
}

//randomly get content from an array.
function randChoice(arr, i){
	return ((i == 1)? Math.floor(Math.random() *arr.length) : arr[Math.floor(Math.random() *arr.length)]);
}

//check if an array contains a key
function checkArr(arr, key){
	key = key.toLowerCase();
	for(i in arr){
		if(((key.trim()).indexOf(arr[i].toLowerCase())) >= 0){
		 	return true
		}
	}
	return false
}


//getting a random number
function rand(x, y){
	x = x.toString();
	if(x.indexOf("%") >= 0 && !isNaN(Number(0, x.substr(x.length - 1)))){
		x = x.substr(0, x.length - 1);
		var rand = Math.floor(Math.random() *101);
		return (rand <= x);
	}
	if(isNaN(Number(x)) || isNaN(Number(y)) && y !== undefined){
		return NaN;
	}
	x = Number(x)
	y = (y === undefined)? 0 : y ;
	var rand = Math.floor(Math.random() *x +y)
	return rand	
}

//create a playable ninja
function createTrueShinobi(){
	var name = $(".stats .me .name").text(), gender = $(".inform > ins span.sel").text();
	name = (name === undefined || name.length == 0)? "User" : name.trim() ; 
	for(i in name){
		if(name.toLowerCase().charCodeAt(i) > 122 || name.toLowerCase().charCodeAt(i) < 97){
			if (i <= 1 && name.charAt(i) == '!') {
				continue;
			}
			name = "User";
			break;
		}
	}
	$(".stats .me .name").text(name);
	Ninja.prototype.people.push(new Ninja(name, gender));	
	var me = Ninja.prototype.people[0];
		addPower(me);
		addPower(me);
	return Ninja.prototype.people[0];
}

//create a couple of non-playable ninja
function createFalseShinobi(amount){
	var pro = Ninja.prototype
	var usedNames = [];
	for(var n in pro.people){
		usedNames.push(pro.people[n].name);
	}
	amount = (amount === undefined || isNaN(amount))? Math.floor(Math.random() *2 +4) : amount ;
 	var l ="abcdefghijklmnopqrstuvwxyz";
	function createName(num){
		var name = "";
		var nameLen = Math.floor(Math.random() *2 +1);
		for(i=0; i<=nameLen; i++){
			name+= l.charAt(rand(l.length));	}
		name += (num.toString());
		return name;
	}//create a name for the ninja
 	while(amount > 0){
		pro.people.push(new Ninja(createName(amount), null, 1));
		amount--
 	}//add the new ninja to the Ninja Object
 	//to add powers (jutsu) to each computer controlled ninja.
 	var badNinja = pro.people.slice(1);
 	for(n in badNinja){
		while(badNinja[n].showPowers().length <= 3){//adding 3 jutsu each
 	      if(rand("75%")){
 	    	var rank = 0;
 	      }else if(rand("75%")){
 	    	var rank = 1;
 	      }else{ var rank = 2; }
 	      //^randomly selecting a jutsu rank
 	      var xRank = pro.powerList()[rank];
	      var found = true ;
		  var index = rand(xRank.length);
 	      function addBadPower(){
 	        for(x in badNinja[n].powers){
 	          if(badNinja[n].powers[x].name == xRank[index].name){
 	            badNinja[n].powers.splice(x, 1);
 	          }
 	        }
			badNinja[n].powers.push(xRank[index]);
			i++
		  }
		  addBadPower();//to add a jutsu to the current bad ninja. Makes sure there's no repetition of jutsu.
 	    }
 	}
 	return sortByPower(badNinja);
}

//add one jutsu to a ninja
function addPower(ninja){
  var pro = Ninja.prototype;
  var oldPowersLen = ninja.powers.length;
	function add(){
		var xList = pro.powerList();
		var allPowers = [];
		for(rnk in xList){
		  for(i in xList[rnk]){
			allPowers.push(xList[rnk][i])
		  }
		}
		if(ninja.isMaster == true){
			allPowers = allPowers.reverse();
		}
		if(ninja.powers.length >= allPowers.length){  return false;  }
		for(i in allPowers){
		  if(rand("50%")){
		    for(p in ninja.powers){
		      if(ninja.powers.length < 1){	break	}
		      if(ninja.powers[p].name == allPowers[i].name){
		  		ninja.powers.splice(p, 1);
		      }
		    }
		    ninja.powers.push(allPowers[i]);
			break
		  }
		}
	}
	while(ninja.powers.length <= oldPowersLen){
		var canAdd = add()
		if(canAdd == false){
			return false
		}
	}
	return true
}

//convert normal name to ninja name
function shinobiName(name){
	name = (name.length > 4)? name.substr(0, 4).trim() : name.trim() ;
	var jap = ["ya","cho","shi","lee","bi","za","ne","sa","ke","ku","bu","ra","na","ra","ji","ka","maru","mi","ita","to","ti","chi","ra","oro","gaa","bu"];
	name = name.toLowerCase().split("")
	for(i in name){
		name[i] = jap[name[i].charCodeAt(0) - 97];
	}
	name = capitol(name.join(""));
	return name;
}

//determine the power level of a ninja
function getPowerLevel(n){
	var pro = Ninja.prototype;
	var ninja = (isNaN(n))? n : pro.people[n];
	function getNinjaPower(){
		var score = 0;
		var pows = ninja.powers
		for(var i in pows){
			score += (pows[i].dmg < 2000)? pows[i].dmg : 1000 ;
		}
		return score;
	}
	return getNinjaPower();
}

//sort ninjaList by power
function sortByPower(nLis){
	var nList = nLis;
	var newList = [];
	function getMax(){
	  var max = [0, 0];
	  for(n in nList){
		if(nList[n].powerLevel(0) > max[0]){
			max[0] = Number(nList[n].powerLevel(0));
			max[1] = n;
		}
	  }
	  newList.push(nList[max[1]]);
	  nList.splice(max[1], 1);
	}
	while(nList.length > 0){
		getMax();
	}
	//alert(nList)
	return newList
}

/*The Ninja*/
//Each Ninja
const Ninja =function(name, sex, comp){
	var pro = Ninja.prototype;
	//misc
	this.ID = pro.people.length + 1;
	this.isComp = Boolean(comp);
	var currShinobiName = (name.indexOf("!!") == 0) ? name.substr(2) : shinobiName(name);
	this.name = currShinobiName;
	this.toString = function(){
		return this.name
	}
	//life & death
	var alive = true;
	this.isAlive = function(live){
		if(live == 0 || this.health <= 0){	alive = false	}else if( live == 1){  alive = true  }
		return alive }
	this.isOld = function(){
		return(((currAge/maxAge)*100) >= 60)? true : false ;	}
	var maxAge = Math.floor(Math.random() *25 +65);
 	var currAge = (!this.isComp)? 22 : Math.floor(Math.random() *30 +20) ;
	this.age = function(i){
		if(i === undefined || isNaN(i)){ 			return currAge }
		currAge = currAge+i ;
		if(currAge >= maxAge){
			currAge = maxAge;
			alive = false;
		}
		return currAge;
	}
	var sex = (sex != null)? sex.trim() : randChoice(["Male","Male","Male","Female"]) ;
	this.gender = function(type){
		if(type == undefined || isNaN(type) || type >= 5){
			return sex.toLowerCase();
		}else if(type == 1){
			return (sex == "Male")? "he" : "she" ;
		}else if(type == 2){
			return (sex == "Male")? "his" : "her" ;
		}else if(type == 3){
			return (sex == "Male")? "him" : "her" ;
		}else{
			return (sex == "Male")? "man" : "lady" ;
		}

	}
	
	//powers
	this.powers = []
	this.showPowers = function(){
		var lst = [];
		for(i in this.powers){
			lst.push(this.powers[i].name);
		}
		return lst
	}
	this.maxChakra = 200
	this.maxHealth = 400
	var powerLvl;
	this.powerLevel = function(upgrade){
		if(powerLvl !== undefined && this.isComp){
			if(this.isComp && (this.maxChakra == 200 && this.maxHealth == 400)){
				this.chakra = (this.maxChakra += (rand(powerLvl/2, 300)));
				this.health = (this.maxHealth += (rand(powerLvl/2, powerLvl/4)));
			}
			return getPowerLevel(this);	
		}
		for(i in pro.people){
			if(pro.people[i].ID == this.ID){
				var formerPowerLvl = powerLvl;
				powerLvl = getPowerLevel(i);
				if(upgrade != 0){
					this.maxChakra += (rand(70, 20));
					this.maxHealth += (rand(90, 50));
				}
				if(formerPowerLvl === undefined){
				    this.health = this.maxHealth;
				    this.chakra = this.maxChakra;
				}
				return powerLvl;
				break;
			}
		}
	}
	this.powerLevel();
	this.refresh = function(){
		this.health = this.maxHealth;
		this.chakra = this.maxChakra;
		powerLvl = getPowerLevel(this);
	}
	
	//bio
	this.isMaster = false;
	this.achievements = [];
	if(this.isComp){
		this.abode = randChoice(["Beijing","The North Star village","The Sound village","The Land of Shadows"])
	}else{
		this.abode = "The village hidden in the leaves"
	}
	this.image = "nobody";
	this.setImage = function(i){
		var image = (!this.isComp && i !== undefined)? i.toString() : this.image ;
		var im = (this.isComp)? randChoice(["vicious killer","bounty hunter","ruthless shinobi","skilled assasin","manslayer"]) : image ;
		var specIm = [["Death Reaper","death reaper"],["Taijutsu","taijutsu master"]];
		im = (sex == "Female" && rand("50%"))? ("female "+((checkArr(im, "assasin"))? "assasin" : "shinobi" )): im ;
		for (i in specIm){
			var im = (checkArr(this.showPowers(), specIm[i][0]) && rand("30%"))? specIm[i][1] : im ;
		}
		this.image = (this.isComp)? im : image ;
 		if(!this.isComp){
 			this.achievements.push(this.image);
 			notif(this.image);
 		}
		return this.image;
	};
	if(this.isComp){ this.setImage(); }
	
	//Only for the user's ninja
	if(this.isComp){	return	  }
	this.trueName = function(){
		return name ;
	}
	this.helper = "";
	this.activity = "";
	this.trainings = 0;
	this.enemy;
	this.mortalEnemy;
	this.opponent = ["","",""];
	this.defeated = [];
	this.maxProgress;
	var currProgress = 0;
	this.progress = function(x){
		if(x !== undefined && !isNaN(x)){
			currProgress = (currProgress >= this.maxProgress)? this.maxProgress : currProgress + 1;	
		}
		return (isNaN(x) && x != "")? ((currProgress / this.maxProgress) * 100) : currProgress;
	}
}
//All Ninjas
Ninja.prototype = {
	people : [],
	count : function(){
		return this.people.length
	},
	
	powerList : function(isSpecial){
		//power usable by only masters
		this.special = [{
			name : "Amaterasu",
			cost : 400, dmg : 1000
		}]
		//max dmg is 1475
		//in the "effects", for computer controlled ninja, replace all 'you' with 'she/he', 'your' with 'her/his', 'are' with 'is'
		this.Srank = [{
				name : "Death Reaper",
				cost : 360, dmg : 500
			},{
				name : "Sand Coffin",
				cost : 120, dmg : 350
			}]
		this.Arank = [{
				name : "Chidori",
				cost : 60, dmg : 165
			},{
				name : "Sharingan",
				cost : 89, dmg : 200
			},{
				name:"Shadow posession",
				cost : 39, dmg : 100
		}]
		this.Brank = [{
				name : "Shadow Clone",
				cost : 28, dmg : 50
			},{
				name : "Taijutsu",
				cost : 11, dmg : 30
			},{
				name : "Summoning",
				cost : 40, dmg : 70
		}]
		//returns a list that contains the contents of the 3 powerRanks, sorted from the weakest power ti the strongest. Representation is : return[ [{...}], [{...}], [{...}] ] 
		var pows = [this.Brank,this.Arank, this.Srank.reverse()]
		if(Boolean(isSpecial)){
			pows = [this.special,this.Brank,this.Arank, this.Srank.reverse()];
		}
		return pows
	},
	
	starConstructor : function(name, sex, isGood, act, power){
		var pro = Ninja.prototype;
		var sex = capitol(sex.trim());
		Ninja.call(this, "!!"+name, sex, true);
 		this.name = name;
 		this.isGood = (isGood.toLowerCase() == "good")? true : false ;
		this.act = act;
		this.hasHelped = false;
		this.isMaster = true;
		this.power = [((this.isGood)? "the enemy" : "you"), ((this.isGood)? "lightening-fast attacks" : "a forbidden jutsu" )];
		this.powers.push(Ninja.prototype.powerList(1)[0][0]);
		this.health = (this.maxHealth += rand(400, 600));
 		this.chakra = (this.maxChakra += rand(300, 400));
		this.powerLevel = function(up){
			return getPowerLevel(this);
		}
	}
	
}

//to create four available characters from the Naruto series. One will be selected at random, and used as a mentor/helper to the player.
function createStars(){
	var Master = Ninja.prototype.starConstructor;
	var starNames = [];
	var starTypes = [];
	var stars = {
		good : ["Guy Sensei","Kakashi"],
		bad : ["Orochimaru","Madara"],
		acts : ["gives you a thumbs up","nods","licks his lips","smiles"]
	}
	for(var type in stars){
	   if(type == "acts"){
	  		break
	   }
	   for(var name in stars[type]){
	   		starNames.push(stars[type][name]);
			starTypes.push(type);
	  }
	}
	var masters = [];
	for(var i in starNames){
		var x = ((i-1) > stars.good.length)? i+(stars.good.length) : i ;
		var rawMaster = (new Master(starNames[i], "Male", starTypes[i], stars.acts[x]));
		masters.push(rawMaster);
		for(var i = 0; i<4; i++){
			addPower(masters[masters.length -1]);
		}
	}
	return masters
}


//The life adventures of the ninja
function adventure(){
	var me = createTrueShinobi();
	var others = createFalseShinobi();
	var mentors = createStars();
	var allNinja = Ninja.prototype;
	me.maxProgress = others.length;
	me.enemy = others[0];
	me.opponent[0] = others[others.length -1];
	postStats([me]);
	//^Important
	/*console.log(">> Strongest - \nPower level : "+others[0].powerLevel()+", Health : "+others[0].maxHealth+", Chakra : "+others[0].chakra+" Name : "+others[0]+"\n>> Weakest - \nPower level : "+others[others.length -1].powerLevel()+", Health : "+others[others.length -1].maxHealth+", Chakra : "+others[others.length -1].chakra+" Name: "+others[others.length -1]+"\n\nMy name : "+me+"\nMy true name : "+me.trueName()+"\n\nOthers : "+others+"\n\nMy enemy : "+me.enemy+"\n\nMy powers : "+me.showPowers()+"\n\nMy strength : "+me.powerLevel(0)+"\nMy health : "+me.health+"\nMy chakra : "+me.chakra+"\n\nMy reputation : The "+me.image+" from "+me.abode);
	^^Helpful for testing & debugging */
	
  //function for handling old age if the player
  function handleOldAge(ninja){
  	if(ninja.isOld()){
  		postMessage("<i>"+me+"</i>, you are getting old. Old age "+randChoice(["has started to weaken you.","reduces your strength."]));
		if(rand("75%")){
			postMessage("<em>Finish your mission"+randChoice([", while you still can"," before it is too late"])+".</em>")
		}
		if(!checkArr(me.achievements, "old "+me.gender(4))){
			me.setImage("old "+me.gender(4));
		}
		me.maxHealth -= (rand(me.maxHealth/4, 50));
		me.maxHealth = (me.maxHealth < 0)? 0 : me.maxHealth ;
		me.health = (me.health > me.maxHealth)? me.maxHealth : me.health ;
 	    postStats([me]);
		return true
 	}
  }

  //function for reacting to player's low health
  function handleLowHealth(){
  	if((((me.health * 100) / me.maxHealth ) <= 20) && me.helper != null && me.helper!= "" && me.health > 0 && (!me.helper.hasHelped) && me.opponent[0].isAlive()){
 		interference();
 		return true
 	}
 	return false
  }
 
  //function for handling the termination of the game, if the player dies.
  function handleDeath(ninja){
  	  var vitalStats = ["health","maxHealth"]
  	  for(i in vitalStats){
  	 	if(ninja[vitalStats[i]] <= 0){
			ninja.isAlive(0);
			postStats((me.activity.toLowerCase() == "training")? [me] : [me, me.opponent[0]]);
			me.activity = "";
			break
		}
  	  }
  	  if((!me.isAlive()) && me.helper != null && me.helper != "" && me.helper.hasHelped != true){
		me.activity = "Fighting";
 		interference(1)
 		me.isAlive(1);
 		return	
 	  }
  	  if((!ninja.isComp) && (!ninja.isAlive())){
		var regret;
		if(ninja.maxHealth <= 0){
			regret = "focused on fighting the <code>Akatsuki<code>";
		}else if(ninja.health <= 0){
			regret = (me.trainings >= 8)? "would have better luck next time" : "trained more" ;
			if(ninja.helper == null){
				regret = "gotten a mentor";
			}
		}
		postChoices("Game over","red");
		postMessage("<b>You are dead</b>");
		if(regret !== undefined){
			regret = (regret.indexOf("would") == 0)? regret : "should have "+regret ;
			postMessage("<em>Perhaps"+" you "+regret+"</em>");
		}
		$(".buttons .but").off("click");
		return ($(".buttons .but").first().one("click", function(){
			window.history.go()
		}))
	  }
  }
 
  //function for handling the completion of the game
  function handleGameCompleted(){
  	  postStats([me, me.opponent[0]]);
  	  if(me.helper != "" && me.helper != null){
		postMessage("Your mentor, "+me.helper+", "+me.helper.act+randChoice([" in approval"," in admiration"]));
	  }
	  if(me.isOld){
	  	postMessage("<b>You have overcome all challenges and proven yourself to be a <i><b>"+me.image+"</b></i></b>");
	  }else{
	  	postMessage("<b>Well done, "+me+", you are a "+me.image);
	  }
	  postChoices("Game over","lightskyblue");
	  $(".buttons .but").off("click");
	  return ($(".buttons .but").first().one("click", function(){
	  	window.history.go();
	  }))
  }
  
 //Function for handling the addition of a mentor to the player.
  function getMentor(reply){
  	  var rawMentors = Ninja.prototype.stars;
	  var mentorList = mentors;
	  //mentorList = mentorList.slice(2)
	  function fetchMentor(){
	 	  var ment = mentorList[rand(mentorList.length)];
		  if(me.mortalEnemy === undefined){	return ment }
		  if(ment.name != me.mortalEnemy.name){	return ment  }else{
		  	return fetchMentor();
		  }
	  }
	  var mentor = fetchMentor();
	  me.helper = (me.helper == "" || me.helper == null )? mentor : me.helper ;
 	  if(reply == 0){
 	  	  me.activity = "Mentorship";
 	  	  postMessage("Impressed by your "+randChoice(["dedication to","consistent"])+" training, the great <b>"+mentor+"</b> "+((mentor.name.indexOf("Sensei") >= 0)? "" : "sama")+" has offered to help train you");
		postMessage("<em>Do you accept the offer?</em>");
		postChoices(["Accept","Reject"]);
		return
 	  }
 	  if(reply == "Accept"){
 	 	postMessage("<em>Offer accepted.<br/>Your mentor is "+me.helper+"</em>");
		me.setImage("apprentice");
		for(i in me.powers){
			me.powers[i].dmg *= 1.2;
		}
		var addChk = rand(20, 40);
		me.health = (me.health + addChk > me.maxHealth)? me.maxHealth : me.health + addChk ;
 	  }
	  if(reply == "Reject"){
	  	if(!me.helper.isGood && me.mortalEnemy === undefined){
	  		me.mortalEnemy = me.helper
	  		postMessage("<em>Offer declined</em>");
	  		friendToFoe();
	  		me.helper = "";
	  		me.setImage("brave one");
	  	}else{
	  		me.helper = null;
	  		me.setImage("dishonorable");
			postMessage("<em>Offer declined</em>");
		}
	  }
	  me.activity = "";
	  postChoices(["fight","train"])
	  postStats([me]);
  }	
 
  function friendToFoe(){
 	  postMessage('<code>"You arrogant fool", '+me.mortalEnemy+' says. "'+randChoice(["I could have been your ally. Now I will be your enemy","I offer you help and you dare to refuse? You will pay with your life!"])+'"</code>');
	  postMessage("<em>After completing your mission, you will face the great "+me.mortalEnemy);
	  others.unshift(me.mortalEnemy);
	  me.maxProgress += 1;
  }

 //Function for making the mentor help the player
  function interference(now){
  	  if(me.helper.hasHelped || !(me.opponent[0].isAlive()) || me.opponent[0].health <= 0){
  	 	return
  	  }
  	  var powWho = me.helper.power[0]
  	  powWho = (powWho.toLowerCase() == "you")? "you" : me.opponent[0].name ;
  	  var activity = ("Your mentor, "+me.helper+" performs "+me.helper.power[1]+" on <b>"+powWho+"</b>")
	  var entrance = (randChoice(["All of a sudden","Suddenly"])+", <b>"+me.helper+"</b> "+randChoice(["is beside you","is by your side"]))
	  me.helper.hasHelped = true;
 	  if((!me.helper.isGood) && Boolean(now)){
		postMessage("<b>You are dead</b>");
		postMessage(entrance);
		postMessage("<em>"+activity+", raising you from the dead</em>");
		me.health += ((me.maxHealth/0.8 )-rand(30));
		me.health = (me.health > me.maxHealth)? me.maxHealth : me.health;
		me.isAlive(1);
		me.setImage("undead fighter");
		postStats([me, me.opponent[0]])
		return
 	  }else if((!me.helper.isGood) && me.health > 0){
	    me.helper.hasHelped = false;
		return
	  }
	  postMessage("<b>"+randChoice(["You are starting to feel "+randChoice(["weak","dizzy"]), "You are dying"])+"</b>");
 	  postMessage(entrance);
 	  postMessage("<em>"+activity+"</em>");
 	  me.health = (me.maxHealth - me.health <= 70)? me.maxHealth : rand(30, 40);
	  me.health = (me.health > me.maxHealth)? me.maxHealth : me.health;
	  var oppoH = me.opponent[0].health;
  	  oppoH -= ((me.opponent[0].maxHealth * 0.7 )-rand(30));
	  me.opponent[0].health = (oppoH = (oppoH < 0)? 0 : oppoH);
 	  me.setImage("lucky ninja");
 	  postStats([me, me.opponent[0]])
  }

  function action(res){
  	  if(res == "Train" ){
		  train();
	  }else if(me.activity == "Mentorship"){
	  	  getMentor(res);
	  }else if(res == "Fight" || me.activity == "Fighting" ){ fight(res); }
	  handleDeath(me)
		
	  function train(){
	  	  me.activity = "Training";
	  	  function normalTraining(){
	  	     me.age(rand((me.helper == "" || me.helper == null)? 2 : 4, 1));
	  	     postMessage("Time passes, as you "+randChoice(["improve your skills","train yourself"])+".")
	  	  }
	  	  function usefulTraining(){
	  	  	if(me.helper != "" && me.helper != null && rand("50%")){
	  	  	var msg = "Your mentor, "+me.helper+", has taught you a new power.";
	  	  	}else{
	  	  	var msg = randChoice(["Thanks to your training","After a long training session","After months of training"])+", you have mastered a new jutsu";
	  	  	}
	  	  	var newP = me.showPowers()[me.showPowers().length - 1];
	  	  	postMessage(msg);
	  	  	postMessage("<b>You have gotten a new power : "+((newP.indexOf("jutsu") >= 0)? newP : ("The "+newP+" jutsu"))+"</b>");
			me.age(rand(2, 4));
	  	  }
	  	  
	  	  if(rand(((me.helper != "" && me.helper != null)? "33" : "70")+"%") && (!me.isOld()) /*|| true*/){
	  	  	  var canAddPower = addPower(me);
			  if(!canAddPower){
			 	normalTraining();
			  }else{
			    usefulTraining();
			  }
	  	  }else{  normalTraining();  }
	  	  var toUpgrade = (me.isOld())? 0 : 1;
		  me.powerLevel(toUpgrade);
		  me.refresh();
		  handleOldAge(me);
		  postStats([me]);
		  ++me.trainings
		 
		  var key = [[6, "determined fighter"],[11, "unstoppable Ninja"]];
		  for(var i in key){
		  	  if(me.trainings == key[i][0]){
				me.setImage(key[i][1]);
			  }
		  }
		  if(me.helper == "" && me.progress() >= 20 && (rand(me.progress()+((me.isOld)? 100 : 100 )+"%") /*|| true*/)){
		  	  getMentor(0);
		  }else{
		 	  postChoices(["fight","train"]);
		  }
	  }
	
	 function fight(res){
	 	  //set activity & get opponent
	 	  me.activity = "Fighting";
	 	  var oppo = me.opponent[0];
	 	 
	 	  //function to make player strike opponent
	 	  function goodStrike(){
	 	  	var jutsu = me.powers[rand(me.powers.length)];
			var fakeJutsuName = ((jutsu.name.indexOf("jutsu") >= 0)? jutsu.name : (jutsu.name+" jutsu"));
			if(jutsu.cost > me.chakra){
				postMessage("You tried to use "+randChoice(["your ",""])+"<i>"+fakeJutsuName+"</i>, but you"+randChoice([" didn't have enough chakra","r chakra was low"]));
				var addChkr = rand(me.maxChakra/3, 50);
				me.chakra = ((me.chakra + addChkr) > me.maxChakra)? me.maxChakra : me.chakra + addChkr ;
				postMessage("<em>You have regenerated "+addChkr+" chakra</em>");
				return
			}
			if(rand("10%") && me.chakra < me.maxChakra/2){
				var addChkr = Math.round(me.maxChakra / rand(4, 2));
				me.chakra = ((me.chakra + addChkr) > me.maxChakra)? me.maxChakra : me.chakra + addChkr ;
				postMessage("<em>You have regenerated "+addChkr+" chakra</em>");
				
			}
			if(rand("10%") && (me.chakra - jutsu.cost >= 0 && oppo.chakra - jutsu.cost >= 0)){
				postMessage("You "+randChoice(["used","tried"])+" <i>"+fakeJutsuName+"</i> on "+oppo+", but "+oppo.gender(1)+" "+randChoice([randChoice(["narrowly",""])+" dodged it"," countered it with "+oppo.gender(2)+" own"]));
				me.chakra -= jutsu.cost;
				oppo.chakra = me.opponent[0].chakra -= jutsu.cost;
				return
			}
			postMessage("You "+randChoice(["hit","attack"])+" <b>"+oppo+"</b> with your <i>"+fakeJutsuName+"</i>", `+${jutsu.dmg} dmg`)
			me.chakra = ((me.chakra - jutsu.cost) < 0)? 0 : me.chakra - jutsu.cost ;
			oppo.health = me.opponent[0].health = ((oppo.health - jutsu.dmg) < 0)? 0 : me.opponent[0].health - jutsu.dmg ;
	 	  }
	 	 
	 	  //function to makeopponent strike player
	 	  function badStrike(){
	 	    oppo = me.opponent[0];
	 	  	var jutsu = oppo.powers[rand(oppo.powers.length)];
			if(capitol(jutsu.name).trim() == "Amaterasu" && jutsu.cost <= oppo.chakra && rand("50%")){
				jutsu = oppo.powers[rand(oppo.powers.length)];
			}
	 		var fakeJutsuName = ((jutsu.name.indexOf("jutsu") >= 0)? jutsu.name : (jutsu.name+" jutsu"))
	 	  	if(jutsu.cost > oppo.chakra){
	 	  		postMessage(oppo+" tried to use <i>"+fakeJutsuName+"</i>, but "+randChoice([oppo.gender(1)+" didn't have enough chakra",oppo.gender(2)+" chakra was low"]));
	 	  		var addChkr = rand(jutsu.cost/2, 150);
	 	  		oppo.chakra = ((oppo.chakra + addChkr) > oppo.maxChakra)? oppo.maxChakra : oppo.chakra + addChkr ;
	 	  		return
	 	  	}
	 	  	postMessage(oppo+" "+randChoice(["hit","attacked"])+" <b>You</b> with "+oppo.gender(2)+" <i>"+fakeJutsuName+"</i>", `-${jutsu.dmg} dmg`)
	 	  	oppo.chakra = ((oppo.chakra - jutsu.cost) < 0)? 0 : oppo.chakra - jutsu.cost ;
	 	  	me.health = ((me.health - jutsu.dmg) < 0)? 0 : me.health - jutsu.dmg ;
	 	  }
	 	 
	 	  //to introduce opponent
	 	  if(res == "Fight"){
	 	 	oppo = me.opponent[0];
	 	 	if(others[0] == me.mortalEnemy && (!me.enemy.isAlive())){
				oppo = me.mortalEnemy;
			}
	 	  	description = ("<b>"+oppo.name+"</b>"+((me.opponent[0] == me.mortalEnemy)? "" : ", the "+oppo.image+" from "+oppo.abode));
			postMessage((((me.opponent[0] == me.enemy)? ("Your "+randChoice(["last","final"])+" <code>Akatsuki</code> opponent is ") : (randChoice([((me.defeated.length <= 0)? "The first Akatsuki member you encounter is" : "Next you meet"), "Your opponent is"])+" "))+description));
			var feudTxt = randChoice(["'You really think you can defeat me?',","'You don\'t stand a chance',"])+oppo.gender(1)+' '+randChoice(['laughs.','says. "You are either '+randChoice(["very","really"])+' brave or '+randChoice(["very","really"])+' stupid."']);
			var msg = (me.opponent[0] === me.enemy)? feudTxt : randChoice([capitol(oppo.gender(1))+" laughs at you.<br/>You laugh right back.",capitol(oppo.gender(1))+" wears a confident smile on "+oppo.gender(2)+" face"]);
			if(me.opponent[0] == me.enemy){
				postMessage("<code>"+feudTxt+"</code>");
			}else if(rand("50%")){
				postMessage("<code>"+msg+"</code>");
			}
	 	  }else{
	 	  	//to make player and opponent attack each other
			handleLowHealth();
	 	  	if(oppo.isAlive()){
	 	  		goodStrike();
	 	  	}
	 	  	handleDeath(me);
	 	  	if(oppo.isAlive() && me.isAlive()){
	 	  		badStrike();
	 	  	}
	 	  	me.health += (me.health <= 0 && oppo.health <= 0)? 1: 0;
	 	  }
	 	  
	 	  //update choices
	 	  postStats([me, oppo]);
	 	  
	 	  //if opponent is dead
	 	  if(!me.opponent[0].isAlive()){
	 	    postMessage("<b>"+oppo+" drops "+randChoice(["to the ground, ",""])+"dead");
			me.defeated.push(oppo);
			me.opponent[0].isAlive(0);
			var count = me.progress(1);
			count = (me.mortalEnemy !== undefined)? count + 1 : count ;
			var msg = (+count+" down.<br/>"+(me.maxProgress - count)+" <i>Akatsuki</i> member"+((me.maxProgress - count == 1)? "" : "s")+" remaining");
			msg = (me.progress() >= 99 && me.defeated.length >= others.length)? ((randChoice(["Congratulations, m","M"])+"ission complete!<br/>You have defeated ")+((me.mortalEnemy === undefined)? "all the akatsuki members." : "all your opponents.")) : msg ;
			msg = (me.maxProgress - count == 0 && msg.indexOf("complete") < 0 && me.mortalEnemy !== undefined)? "You have defeated all <code>Akatsuki</code> members.<br/>Next, you face "+me.mortalEnemy : msg ;
			postMessage("<em>"+msg+"</em>");
			postStats([me]);
		  //if all opponents have been defeated
			if(me.progress() >= 99){
		 		me.setImage("hero");
		 		handleGameCompleted();
		 		return
		  	}
			nextOpponent();
			postChoices(["fight","train"]);
			me.refresh();
			return
		  }
		  
		  //update choices
	 	  postChoices("Attack");
	
		  //select next opponent 
	 	  function nextOpponent(){
	 	    if(me.defeated.length == 0){
			  me.opponent[1] = others[others.length - 2];
		     }else{
		      me.defeated.push(me.opponent[0]);
			  var unchallenged = [];
		 	  for(var i in others){
		 		if(!others[i].isAlive()){
					me.opponent[0] = me.opponent[1];
					me.opponent[1] = others[i - 2];
					break
				 }
				 
		 	 }
		    }
		  }
	 	  if(me.opponent[1] == "" && me.progress() <= 20){
	 	  	nextOpponent();
	 	  }
		  return
	 }
  }
	
	//to update the button(s) with available choices.
	function postChoices(choices, color){
	choices = ((choices.constructor).toString().toLowerCase().indexOf("string") >= 0)? [choices] : choices ;
	$(".buttons .but").first().text(capitol(choices[0]));
	if(color !== undefined){
		$(".buttons .but").first().css("background",color);
	}
	if(choices.length >= 2){
	    if($(".buttons .but").length < 2){
		  $(".buttons").append("<span class='but'></span>")
	}
	    $(".buttons .but").last().text(capitol(choices[1]));
	}else if($(".buttons .but").length >= 2){
	    $(".buttons .but").remove(":eq(1)")
	}
	var clicked = false;
	$(".buttons .but").one("click", function(){
		if(!clicked){
	 		action($(this).text());
	 		clicked = true;
	 	}
	 	return
	 });
	}
	postChoices(["fight","train"]);

}
//to officially start the game
$(".buttons .but").first().one("click", function(){
	postMessage("<b>Begin</b>");
	setTimeout(function(){
		adventure();
	}, 500);
})


//to post the current stats of the ninja
function postStats(peeps){
	if(peeps.length == 1){
		$(".stats > span").eq(0).addClass("lone");
		$(".stats > span").eq(1).fadeOut(0);
	}else{
		$(".stats > span").eq(0).removeClass("lone");
		$(".stats > span").eq(1).fadeIn(0);
	}
	for(i in peeps){
		var stats = ["health","maxHealth","chakra","maxChakra"];
		var which = (i == 0)? 0 : 1 ;
		var ninja = peeps[which];
		for(var s in stats){
			ninja[stats[s]] = Math.round(ninja[stats[s]]);
		}
		$(".stats > span").eq(which).find(".name").text(ninja.name);
		$(".stats > span").eq(which).find(".strength").html("<ins>Strength : </ins>"+ninja.powerLevel(0));
		var health = (((ninja.health * 100) / ninja.maxHealth ) <= 20)? "<i>"+ninja.health+"</i>" : ninja.health ;
		$(".stats > span").eq(which).find(".health").html("<ins>Health : </ins>"+(health+"/"+ninja.maxHealth));
		var chakra = (((ninja.chakra * 100) / ninja.maxChakra ) <= 20)? "<i>"+ninja.chakra+"</i>" : ninja.chakra ;
		$(".stats > span").eq(which).find(".chakra").html("<ins>Chakra : </ins>"+(chakra+"/"+ninja.maxChakra));
	}
}

//to post the results of an action
function postMessage(result, more='') {
	var color = ["", ""];
	var pro = Ninja.prototype.people;
	if (pro.length >= 1) {
		var keys = [[pro[0].opponent[0], "bad"], ["you ", "good"]];
		for (var k in keys) {
			if (pro[0].activity.toLowerCase() == "fighting" && result.trim().toLowerCase().indexOf(keys[k][0].toString().toLowerCase()) == 0) {
				color[0] = "<ins class='" + keys[k][1] + "Strike'>";
				color[1] = "</ins>";
			}
		}
	}
	$(".reportBox .reports").append(
    `<span>${color[0] + result + color[1]}<small>${more}</small></span>`
  );
}

//for notifying the player
function notif(txt){
	if(txt === undefined || txt == ""){
		return
	}
	
	var hTop = $(".notif").css("top");
	hTop = Number(hTop.substr(0, hTop.length - 2));
	if(hTop < $(document).innerHeight() / 4 && hTop != 0){
		return
	}

	var msg = ("Achievement unlocked!<br/><b>"+capitol(txt.toString().trim())+"</b>");
	$("body").append("<div class='notif'></div>");
	$(".notif").last().html(msg).css({"top":"0%", "opacity":"1" });
	var lastNotif = $(".notif").last()
	//setTimeout(function(){
	$(lastNotif).animate({
		"top" : "33%",
		"opacity" : "0.67"
	}, 2500, function() {
		$("body").one("touchstart click", function(){
			$(lastNotif).css({"opacity":"0"});
		});
	} );
	//}, 20);
}

/*
TO DO -
	Fix Mortal Enemy combat bug
	Fix simultaneous notification bug
*/