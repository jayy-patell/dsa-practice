#include<iostream>

using namespace std;

class CircularQueue{
    public:
    int *arr;
    int front;
    int rear;
    int size;
    
    public:
    // Initialize your data structure.
    CircularQueue(int n){
        size = n;
        arr = new int[size];
        front = rear = -1;
    }

    // Enqueues 'X' into the queue. Returns true if it gets pushed into the stack, and false otherwise.
    bool enqueue(int value){
        //to check whther queue is full
        if( (front == 0 && rear == size-1) || (rear == (front-1)%(size-1) ) ) {
            cout << "Queue is Full";
            return false;
        }
        else if(front == -1) //first element to push
        {
			front = rear = 0;
            arr[rear] = value;
        }
        else if(rear == size-1 && front != 0) {
            rear = 0; //to maintain cyclic nature
            arr[rear] = value;
        }
        else
        {//normal flow
            rear++;
            arr[rear] = value;
        }
        
        return true;
    }

    // Dequeues top element from queue. Returns -1 if the stack is empty, otherwise returns the popped element.
    int dequeue(){
        if(front == -1){//to check queue is empty
            cout << "Queue is Empty " << endl;
            return -1;
        }
        int ans = arr[front];
        arr[front] = -1;
        if(front == rear) { //single element is present
            front = rear = -1;
        }
        else if(front == size - 1) {
            front = 0; //to maintain cyclic nature
        }
        else
        {//normal flow
            front++;
        }
        return ans;
    }
};

int main(){
    int num;
    cout<<"Enter size of queue: ";
    cin>>num;
    CircularQueue* cq;
    cq = new CircularQueue(num);

    int input;
    do{
        cout<<"\n1.Push\n2.Pop\n3.Display\n4.Exit\nWhat do you want to do?? ";
        cin>>input;

        switch(input){
            case 1: {
                int value;
                cout<<"Enter a number to push: ";
                cin>>value;
                if(cq->enqueue(value)){
                    cout<<"Pushed successfully!";
                }else{
                    cout<<"Push abort.";
                }
                break;
            }
            case 2: {
                cout<< cq->dequeue(); break;
            }
            case 3: {
                for(int i=0;i<num;i++){
                    cout<<cq->arr[i]+"\t";
                }
                break;
            }
            case 4: {
                cout<<"ByeBye"<<endl;
                break;
            }
        }
    }while(input!=4);

    return 0;
}