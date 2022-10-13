const newObj = {...obj}
return () => {
    console.log(newObj);
}

1. you have to allocate space on the heap for this new object
1. proper references have to be establish so that js knows when to clean this up
1. when a gc happens, the marking phase has to ensure that this object is still
   in use or not and during the sweep phase if this object isn't used, it will
   be reclaimed.

Creating new objects..
array.map
array.filter

if creating new objects does not kill you, press the like button, or i'll kill
you

if it does kill you, you don't need to press the like button, you are already
dead, but press it to, or i'll kill you

Object.assign({}, {
    ...
}, opts);

So i did a little test, lets see if a simple example can reallllllly show cost.

FIRST!!! To the program

So the program is pretty simple, we simply create prop 5 or 10.  I wanted to
see how much prop size affects running speed.

Second, lets see the results.  I have here three numbers, and these are very
important.

1.  This is how many subs i would have if you everyone would quit watching but not subbing to my videos.. SO PRESS IT
*
ITS RIGHT THERE
*

1. Ok, real talk here are the numbers.

First, i'll run the non object pooling version
* mainsplain numbers *

Second, i'll run the object pooling version
* mainsplain the numbers *

--
IT is INCREDIBLE how much faster object pooling is, but let me show you why!

* bring up debugger console

if you are familiar with the debugger console, then you will know i'll use the
profile tab and you will hit the like button

Now where to use this
1. i would be very careful, you have to know the lifecycle of your objects and
   who holds them. this isn't rust
1. i see good use on servers.
1. libraries that have internal state
1. Again, don't just go run off and start using them.




