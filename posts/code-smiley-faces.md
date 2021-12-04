---
title: "Syntactically Correct Smiley Faces"
date: "<2021-08-08 Sun>"
---

This post will attempt to answer the question on everyone's minds: How can I use smiley faces in my code? Apart from the obvious smiley faces you can put in comments and strings, here's what I've found:


# Python

Unfortunately the closest I could find for Python was with slicing:

```python
l = [1, 2, 3]
l[1:] # :]
l[:1] # [:
```

Everywhere else in Python the round bracket and colon end up being in the wrong order :(. For example `def f():`, or `[1,2,3][1:(2+3)]`.


# Haskell

Haskell's list data constructor is `:`, so we can do:

```haskell
λ> (:) 'V' "alid Smiley"
"Valid Smiley"
```

You can also make your own functions or data constructors, for example here's a smiley function with a curly tuft of hair:

```haskell
(@:) :: String -> String
(@:) s = s ++ " @:)"
```

```haskell
λ> (@:) "Hi!"
"Hi! @:)"
```

Unfortunately it seems the smiley bracket can't be a part of the function/constructor name itself, we just have to make sure we use the function in prefix notation :(.

Haskell's multi-line comments give us some smiling/squeamish [cyclopes](https://www.merriam-webster.com/words-at-play/how-to-pluralize-cyclops-cyclopes):

```haskell
{-
Smiling cyclopes
-}
```
