const { conversation, Simple, Suggestion } = require('@assistant/conversation');
const functions = require('firebase-functions');

const app = conversation();

var jokes = [
  { text: "Debugging; It's like being a detective. A detective where you also committed the crime.",
    speech: "Debugging; It's like being a detective. A detective where you also committed the crime."
  },
  { text: "To define recursion, you first need to define recursion.",
    speech: "To define recursion, you first need to define recursion."
  },
  { text: "A parrot that sits on your shoulder and says \"Squawk! Pieces of seven, pieces of seven! Squawk! ...\" is a parity error! ",
    speech: "A parrot that sits on your shoulder and says \"Squawk! Pieces of seven, pieces of seven! Squawk! ...\" is a parity error! "
  },
  { text: "To keep a programmer in the shower all day, give them a bottle of shampoo which says \"lather, rinse, repeat.\" ",
    speech: "To keep a programmer in the shower all day, give them a bottle of shampoo which says \"lather, rinse, repeat.\" "
  },
  { text: "NASA programmers hit the space bar on weekends. ",
    speech: "NASA programmers hit the space bar on weekends. "
  },
  { text: "The ghosts of programmers say BOOL. ",
    speech: "The ghosts of programmers say BOOL. "
  },
  { text: "The programmer quit their job because they didn't get arrays, or vectors for that matter. ",
    speech: "The programmer quit their job because they didn't get arrays, or vectors for that matter. "
  },
  { text: "The programmer left their job because they just couldn't hack it. ",
    speech: "The programmer left their job because they just couldn't hack it. "
  },
  { text: "Operating systems programmers typically have better vision because they C++. ",
    speech: "Operating systems programmers typically have better vision because they C++. "
  },
  { text: "Programmers like dark mode because light attracts bugs. ",
    speech: "Programmers like dark mode because light attracts bugs. "
  },
  { text: "If Harry Potter was a programmer, he'd be fluent in Python. ",
    speech: "If Harry Potter was a programmer, he'd be fluent in Python. "
  },
  { text: "Programmers love feather pillows because they are down-loaded. ",
    speech: "Programmers love feather pillows because they are down-loaded. "
  },
  { text: "Programmers love to go outside in the winter because it's code outside. ",
    speech: "Programmers love to go outside in the winter because it's code outside. "
  },
  { text: "99 programming bugs in the code, 99 programming bugs. Make a patch to fix just one bug, 102 programming bugs in the code. ",
    speech: "99 programming bugs in the code, 99 programming bugs. Make a patch to fix just one bug, 102 programming bugs in the code. "
  },
  { text: "Once you stop doing functional programming you never return. ",
    speech: "Once you stop doing functional programming you never return. "
  },
  { text: "In Star Wars they program in JawaScript. ",
    speech: "In Star Wars they program in JawaScript. "
  },
  { text: "A user interface is like a joke; if you have to explain it, it's not that good. ",
    speech: "A user interface is like a joke; if you have to explain it, it's not that good. "
  },
  { text: "My 8-month old is well on the way to learning how to program as they're already screaming and banging the keyboard.. ",
    speech: " My 8-month old is well on the way to learning how to program as they're already screaming and banging the keyboard.. "
  },
  { text: "When asked to rewrite the codebase in C++, the C programmers felt nonplussed. ",
    speech: " When asked to rewrite the codebase in C++, the C programmers felt nonplussed. "
  },
  { text: "Your code is so bad that the garbage collector terminated itself. ",
    speech: " Your code is so bad that the garbage collector terminated itself. "
  },
  { text: "Age is just a number and death is just a Boolean. ",
    speech: " Age is just a number and death is just a Boolean. "
  },
  { text: "The wealthy programmer encouraged their kid to write music because it's better to favor composition over inheritance. ",
    speech: " The wealthy programmer encouraged their kid to write music because it's better to favor composition over inheritance. "
  },
  { text: "The main function was sad because no other function calls it. ",
    speech: " The main function was sad because no other function calls it. "
  },
  { text: "Two hard problems in computer science are Naming, caching and off-by-one errors. ",
    speech: " Two hard problems in computer science are Naming, caching and off-by-one errors. "
  },
  { text: "This is my 2nd to last joke: Async broke its Promise because It couldn’t finish the Task in the Future.. ",
    speech: "This is our 2nd to last joke:  Async broke its Promise because It couldn’t finish the Task in the Future.. "
  },
  { text: "This is my last joke: Spider Man is really good at Web Development. ",
    speech: "This is my last joke: Spider Man is really good at Web Development. "
  }
];

var allDone = {
  speech:"That was all my programmer jokes that I know, if you want me to tell you them again, just say reset", 
  text: "That was all my programmer jokes that I know, if you want me to tell you them again, just say reset"
};

var laughes = [
  "haha",
  "jaja",
  "aha",
  "ha",
  "heh heh",
  "bahaha",
  "gahaha",
  "heehee",
  "mwahaha",
  "teehee"
];


app.handle('setup', conv => {
  let message = 'Welcome back to Programmer Jokes. ';
  if (!conv.user.params.jokesTold){
    conv.user.params.jokesTold = 0;
    message = 'Welcome to Programmer Jokes! I\'ll tell you silly jokes about programming. Here is your first one: ';
  } 
  conv.add(message);
  
});


function getsJokes(conv){
  if (conv.user.params.jokesTold == (jokes.length)){
    return allDone;
  }
  var joke = jokes[conv.user.params.jokesTold];
  conv.user.params.jokesTold++;
  return joke;
}

app.handle('joke', conv => {
  var joke = getsJokes(conv);
  if (joke === allDone){
    conv.add(new Simple(joke));
    conv.add(new Suggestion({ title: "reset"}));
    return;
  }
 
  var laugh = laughes[(Math.floor(Math.random() * laughes.length))];
  
  conv.add(new Simple({
    speech: "<speak>" + joke.speech + " <break time='.7' />" + laugh + " <break time='.7' /> </speak>",
    text: joke.text
  }));
});

app.handle('reset', conv => {
  conv.user.params.jokesTold = 0;
});

app.handle('howManyLeft', conv => {
  var left = (jokes.length + 1) - conv.user.params.jokesTold;
  var message = `I have ${left} jokes left. Wanna hear another?`;
  conv.add(message);
  conv.add(new Suggestion({ title: "jokes"}));
});

app.handle('howManyJokes', conv => {
  var message = `I have ${(jokes.length + 1)} jokes and I've only told you ${(conv.user.params.jokesTold)} of them.`;
  conv.add(message);
  conv.add(new Suggestion({ title: "jokes"}));
});


exports.ActionsOnGoogleFulfillment = functions.https.onRequest(app);
