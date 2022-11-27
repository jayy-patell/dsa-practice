#include<iostream>

using namespace std;

class Node{
    public:
    int data;
    Node* next;
    Node* prev;

    Node(int data){
        this->data = data;
        this->next=NULL;
        this->prev=NULL;
    }
};

void reverse(Node* &head){
    Node* curr= head;
    Node* temp= NULL;
    while(curr != NULL){
        temp = curr->prev;
        curr->prev = curr->next;
        curr->next = temp;
        curr = curr->prev;
    }
    if(temp!=NULL)
        head = temp->prev;
}

void insertAtHead(Node* &tail, Node* &head, int d){
    if(head == NULL){
        //inserting first element in the list
        Node* temp = new Node(d);
        tail = temp;
        head = temp;
    }
    else{
        Node* temp = new Node(d);
        temp->next = head;
        head->prev = temp;
        head = temp;
    }
}

void insertAtTail(Node* &tail, Node* &head, int d){
    if(tail==NULL){
        //inseerting first element in list
        Node* temp = new Node(d);
        tail = temp;
        head = temp;
    }
    else{
        Node* temp = new Node(d);
        tail->next = temp;
        temp->prev = tail;
        tail = temp;
    }
}

void insertAtPosition(Node* &tail, Node* &head, int pos, int d){
    //if list is empty.. this case is covered in insert at head and tail

    //insert at start
    if(pos==1){
        insertAtHead(tail, head, d);
    }

    Node* temp = head;
    int cnt=1;
    while(cnt<pos-1){
        temp=temp->next; cnt++;
    }

    //insert at last
    if(temp->next == NULL){
        insertAtTail(tail, head, d);
    }

    Node* nodeToInsert = new Node(d);
    nodeToInsert->next = temp->next;
    temp->next->prev = nodeToInsert;
    temp->next = nodeToInsert;
    nodeToInsert->prev = temp;
}

void deleteNode(int position ,Node* &head){
    //deleting start node
    if(position == 1){
        Node* temp = head;
        temp->next->prev = NULL;
        head = temp->next;
        temp->next = NULL;
        delete temp;
    }
    //deleting last or middle node
    else{
        Node* curr = head;
        Node* prev = NULL;

        int cnt=1;
        while(cnt<position){
            prev = curr;
            curr = curr->next;
            cnt++;
        }

        curr->prev = NULL;
        prev->next = curr->next;
        curr->next = NULL;

        delete(curr);
    }
}

void display(Node* head){
    Node* temp = head;
    while(temp!=NULL){
        cout<<temp->data<<" ";
        temp = temp->next;
    }
    cout<<endl;
}

int main(){
    Node* head=NULL;
    Node* tail=NULL;
    int inp,x,pos;
    cout<<"\n1.InsertatHead\n2.InsertatTail\n3.InsertatPosition\n4.Delete\n5.Display\n6.Exit"<<endl;
    do{
        cout<<"Enter what to do??"<<endl;
        cin>>inp;
        if(inp==1){
            cout<<"Enter ele: ";
            cin>>x;
            insertAtHead(tail,head,x);
        }else if(inp==2){
            cout<<"Enter ele: ";
            cin>>x;
            insertAtTail(tail,head,x);
        }else if(inp==3){
            cout<<"Enter ele: ";
            cin>>x;
            cout<<"Enter position to insert ele: ";
            cin>>pos;
            insertAtPosition(tail,head,pos,x);
        }else if(inp==4){
            cout<<"Enter position to delete ele: ";
            cin>>pos;
            deleteNode(pos,head);
        }else if(inp==5){
            display(head);
        }else
            inp=6;
    }while(inp!=6);

    reverse(head);
    display(head);

    return 0;
}