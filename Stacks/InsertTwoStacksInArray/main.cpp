#include<iostream>
#include<stack>

using namespace std;

class twoStack{
    int *arr, size;
    int top1, top2;

    public:
    twoStack(int s){
        this->size = s;
        top1=-1; top2=s;
        arr = new int[s];
    }

    void push1(int value){
        if(top2-top1>1){
            arr[++top1] = value;
        }else{
            cout<<"Stack Overflow"<<endl;
        }
    }
    void push2(int value){
        if(top2-top1>1){
            top2--;
            arr[top2] = value;
        }else{
            cout<<"Stack Overflow"<<endl;
        }
    }

    int pop1(){
        if(top1>=0){
            int ans = arr[top1];
            top1--;
            return ans;
        }else{
            cout<<"Stack Underflow"<<endl;
            return -1;
        }
    }
    int pop2(){
        if(top2<=size-1){
            int ans = arr[top2];
            top2++;
            return ans;
        }else{
            cout<<"Stack Underflow"<<endl;
            return -1;
        }
    }
};

int main(){
    twoStack(10);
    
    return 0;
}