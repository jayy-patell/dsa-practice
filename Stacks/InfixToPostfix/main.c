#include<stdio.h>
#include<string.h>
#include<stdlib.h>

struct Stack {
    int top;
    int* array;
    unsigned capacity;
};

struct Stack* createStack(unsigned capacity){
    struct Stack* stack = (struct Stack*)malloc(sizeof(struct Stack));

    if(!stack){
        return NULL;
    }

    stack->capacity = capacity;
    stack->top = -1;

    stack->array = (int*)malloc(sizeof(int));
}

int isEmpty(struct Stack* stack){
    return stack->top == -1;   //returns 0 or 1
}
char peek(struct Stack* stack){
    return stack->array[stack->top];
}
char pop(struct Stack* stack){
     if (!isEmpty(stack))
        return stack->array[stack->top--];
    return '$';
}
char push(struct Stack* stack, char op){
    stack->array[++stack->top]=op;
}

int isOperand(char ch)
{
    return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z');
}

int Prec(char ch)
{
    switch (ch) {
    case '+':
    case '-':
        return 1;
 
    case '*':
    case '/':
        return 2;
 
    case '^':
        return 3;
    }
    return -1;
}

int infixToPostfix(char* exp){
    int i,k;
    struct Stack* stack=createStack(strlen(exp));
    if(!stack)
        return -1;

    for(i=0,k=0;exp[i];i++){
        if(isOperand(exp[i]))
            exp[k++]=exp[i];

        else if(exp[i]=='(')
            push(stack,exp[i]);

        else if(exp[i]==')'){
            while(!isEmpty(stack) && peek(stack)!='('){
                exp[k++]=pop(stack);
            }
            if (!isEmpty(stack) && peek(stack) != '(')
                return -1; // invalid expression
            else
                pop(stack);
        }

        else{  //an operator is encountered
            while(!isEmpty(stack) && Prec(peek(stack))>=Prec(exp[i])){
                exp[k++]=pop(stack);
            }
            push(stack, exp[i]);
        }
        
    }
    // pop all the operators from the stack
    while (!isEmpty(stack))
        exp[k++] = pop(stack);
    
    exp[k++] = '\0';
    printf("%s", exp);
}

int main(){
    // char exp[] = "a+b*(c^d-e)^(f+g*h)-i";
    char exp[] = "((a+b)-c*(d/e))+f";
    infixToPostfix(exp);
    return 0;
}

/*
#include<stdio.h>
#include<ctype.h>

char stack[100];
int top = -1;

void push(char x)
{
    stack[++top] = x;
}

char pop()
{
    if(top == -1)
        return -1;
    else
        return stack[top--];
}

int priority(char x)
{
    if(x == '(')
        return 0;
    if(x == '+' || x == '-')
        return 1;
    if(x == '*' || x == '/')
        return 2;
    return 0;
}

int main()
{
    char exp[100];
    char *e, x;
    printf("Enter the expression : ");
    scanf("%s",exp);
    printf("\n");
    e = exp;
    
    while(*e != '\0')
    {
        if(isalnum(*e))
            printf("%c ",*e);
        else if(*e == '(')
            push(*e);
        else if(*e == ')')
        {
            while((x = pop()) != '(')
                printf("%c ", x);
        }
        else
        {
            while(priority(stack[top]) >= priority(*e))
                printf("%c ",pop());
            push(*e);
        }
        e++;
    }
    
    while(top != -1)
    {
        printf("%c ",pop());
    }return 0;
}

*/