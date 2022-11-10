class NStack
{
    int *arr;
    int *top;
    int *next;
    
    int n, s;   //s is size of array, n is no. of stacks 
     
    int freespot;
    
public:
    // Initialize your data structure.
    NStack(int N, int S)
    {
        n = N;
        s = S;
        arr = new int[s];
        top = new int[n];     //array of tops for all stacks..
        next = new int[s];      //next array will be of same size of real array
        
        //top initialise
        for(int i=0; i<n; i++) {
            top[i] = -1;
        }
        //next initialise
        /*
        if(stack is empty then next will point to next freespot)
        else(if there is an ele in stack then next will point to next ele after stack top)
        */
        for(int i=0; i<s; i++) {
            next[i] = i+1;
        }
        //update last index value to -1
        next[s-1] = -1;
        
        //initialise freespot
        freespot = 0;
        
    }

    // Pushes 'X' into the Mth stack. Returns true if it gets pushed into the stack, and false otherwise.
    bool push(int x, int m)
    {
        //check for overflow
        if(freespot == -1) {
            return false;
        }
        
        //1.find index
        int index = freespot;
        
        //2.insert element into array
        arr[index] = x;
        
        //3.update freespot
        freespot = next[index];
       
        //4.update next;
        next[index] = top[m-1];   //m is the stack you want to push the ele
        
        //5.update top
        top[m-1] = index;    //at any time, this indicates har stack ka top points to which index 
        
        return true;
    }

    // Pops top element from Mth Stack. Returns -1 if the stack is empty, otherwise returns the popped element.
    int pop(int m)
    {
        //check underflow condition
        if(top[m-1] == -1) {
            return -1;
        }
        
        int index= top[m-1];
        
        top[m-1] = next[index];
        
        next[index] = freespot;
        
        freespot = index;
        
        return arr[index];
    }
};