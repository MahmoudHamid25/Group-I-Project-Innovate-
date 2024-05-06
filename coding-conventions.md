# Coding conventions
This document describes the standard that our code should be held up to during this project. Nothing in this document is final, anything may be changed if the team agrees to it.

## Naming
- Use meaningful names for all things (classes, variables, methods, filenames etc.), avoid abbreviations and ambiguity. Setters and getters should start with `set` and `get`, however for boolean types it should start with `is`. For example:
  
  ```c#
  public int getValue()
  public void setValue()
  public bool isSet()
  ```
  
- Methods, filenames and variables must start with a lowercase letter, if the method or variable is made up of multiple words then all new words starting from the 1st must start with a capital letter to increase readability.
- Class names should be a singular pronoun, and should start with a capital letter.
- Suffix exceptions with `Exception`.

## Testing
- Tests should be stored in a separate folder, only do 1 class per file.
- Test should be titled like the following:

  ```c#
  void methodThatIsBeingTested_howIsTested_expectedResult()
  ```

## Layout
- Use indentations, 1 indentation is 4 spaces, every statement in a block is indented by one level.
- Use blank lines between blocks of code to separate them.
- Do not use spaces between the keywords like `if`, `while`, `for` and the paranthesis `()`.
- Brackets should start on a new line and end on a new line after the control structure, the brackets should start on the same indentation as the statement. In the case of only 1 statement you don't have to use brackets, but you must use indentations and the statement must be on the line after the control structure. For example:

  ```c#
  while(condition)
  {
      if(true)
          return true;
  }

  if(true)
  {
      for(statements)
      {
          statement 1;
          statement 2;
      }
  }
  ```
- Use spaces around mathemetical operators (`+`, `-`, `*`, `<`, `>`, `==`, `=`, `^`, `%`, `/`).
- Do not use spaces with incrementing or decrementing operators (`++`, `--`).
- For complex calculations use paranthesis to separate parts of the equation.
- Always initialize values with `0` or `null` at the very least.

  ```c#
  int value = (3 + 4 * 6) - (6 / 6);
  int i = 0;
  i++;
  ```

- For classes the structure of the class should be the following:
- 1. Field(s)
  2. Constructor(s)
  3. Getter(s) and setter(s)
  4. Method(s)
- Separate classes from each other using folders, but have classes that belong to each other in the same folder.


  
  
