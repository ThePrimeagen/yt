### Look at this code
What if I asked you how to delete this part of the code?

Most of you are probably asking how did I even highlight that piece of code let
alone delete it?

### There are tons of vim tutorials out there
They all go over the basics, but i wanted to do something different.

I want to talk about some tricks and strategy i take when vimming hard.  This
strategy guide of pure, extra virgin, free range coconut oil and is meant to
help you up the game HARD on your vimming.  Go from someone who can get things
done, do just crushing. to sweating. to absolutely guaranteeing you will be

https://youtu.be/1cKqAmxHVdQ?t=15

** meme this up hard **

### A Note about vimming in general
There are two general branches of vimming as you become an expert.

1. The Chess Player
1. The Primeagen

The chess player thinks about the movements, what is the most bestest move here?

Vim Golfs always.  Now to each their own honestly.  But for me that is too much
overhead.

For me, I don't want analysis paralysis, but I always want to explore and find
out if there is a better way

For me, its about ingraining motions until they are so second nature that your
speed is incredible.  Then, I know a lot of people will disagree, find
something better.  I never have problems changing muscle memory when I have
mastered something.  Its when I am learning that its hard to constantly switch
directions.

###  So if you are looking for a tutorial...
on how to use vim: check out my 6 part series on yt, or my frontendmasters.com
course.

but if you are looking for a tutorial that uses the most arcane moves to shave
your 20 strokes to 19 this aint it.

But if you want repeatable, fast, motions that will make editing out of this
world fun and you will become, "blazingly" fast, then this is the series, oh
yes, I said series, for you

### One more before we get started
Why not use something like easy motion / sneak

### So we will start at the best place possible
Horizontal editing.  Trust me, this is foundational to speed

fn main() {
    if true {
        println!("Hello, world!");
    } else {
        println!("Goodbye, world!");
    }
}

Now this first part is going to be super obvious, but its really important.

first off, if you are not 100% confident with w, you need to get there.

So why master w?  The problem i see with vim is that it has MANY options.  With
many options comes power, but also frustration.  So many people i see are so
busy thinking about what to do, rather than doing.  That is not good.  Master
what you know, add a motion.

A couple years back I did create a program called vim-be-good and doing this
series has re-ignited my passion for that project.
This game is what got me good at relative line number jumping.  And f/t with
,;, needs some much needed updates.  I am going to give it to ya :)

you are officially ... now (maidenless)

### Something you may not know
VD vs dd, VY vs yy

Sometimes its not about being the fastest, but about having the most fun.
Let me give you an example.

### One of my principals for speed
two/there key combos feel like one key

A note about f/t/F/T keys

### More advanced
Replacing.
viw, diW, ciw really come into play
long type copy/paste

// T<space>;yt)f<pa><esc>
// T<space>;yf)f<pr>
// FyyiWf<pr>
fn some_function(arg: some::long::type) -> Result< {
}

function foo(blaz: {oddly: "long" | "type", but: "hey" | "this" | "is | number}) {
}

// 3kya{3jf)hviwp
function new_fn(bar: number) {
}

mixing in registers.  They are amazing.
<leader>p is for pwn

go into v[i/a]{
you can use it with c,d,y...

// why not find and replace
the find you can shortcut / replace

<leader>p

// The ends
// Also super important for macros: Don't worry, got a whole thing planned for
// why multicursors are bad
_, 0, I, A, $

// For when prettier strikes
// Super combos
f{a<CR><C-o>O
$i<CR><Esc>O


