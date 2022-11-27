#include<iostream>
using namespace std;

class Node{
    public:
    int data;
    Node* next;
};

void createNode(Node* &head, Node* &tail,int d){
    Node* temp = tail;
    Node* temp2;

    if(temp==NULL){
        //inserting first node
        temp = new Node();
        temp->data = d;
        temp->next = NULL;
        tail = temp;
        head = temp;
    }
    else{
        temp2 = new Node();
        temp2->data = d;
        tail->next = temp2;
        tail = temp2; 
    }
}

void print(Node* &head){
    Node* temp = head;
    while(temp!=NULL){
        cout<<temp->data<<" ";
        temp = temp->next;
    }
}

void reverseListfromTail(Node* &tail){

}

void reverseList(Node* &head){
    Node* current = head;
    Node* prev = NULL; Node* next = NULL;

    while(current!=NULL){
        next = current->next;
        current->next = prev;
        prev = current;
        current = next;
    }
    head = prev;
    // cout<<"HI";
}

int main(){
    Node* tail = NULL;
    Node* head = NULL;
    
    createNode(head, tail, 10);
    createNode(head, tail, 20);
    createNode(head, tail, 30);
    cout<<"List: ";
    print(head);

    cout<<"\nAfter reversing: ";
    reverseList(head);
    print(head);
    
    return 0;
}