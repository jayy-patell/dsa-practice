#include<iostream>

using namespace std;
class node{
public:
    int data;
    node* next;
};

class llist{
    public:
    node* head;
    node* head2;
    llist(){
        head=NULL;
        head2=NULL;
    }

    void insertll(){
        node* temp = new node;
        node* curr = head;
        cout<<"enter the data you want to enter: "<<endl;
        cin>>temp->data;
        temp->next = NULL;

        if(head==NULL){
            head = temp;
        }
        else{

        while(curr->next!=NULL){
            curr=curr->next;
        }
        curr->next = temp;
    }
    }

    void insertll2(){
        node* temp = new node;
        node* curr = head2;
        cout<<"enter the data you want to enter: "<<endl;
        cin>>temp->data;
        temp->next = NULL;

        if(head2==NULL){
            head2 = temp;
        }
        else{

        while(curr->next!=NULL){
            curr=curr->next;
        }
        curr->next = temp;
    }
    }

    void insertat(){
        node* curr=head;
        int pos;
        node* temp = new node;
        cout<<"enter the data you  want to insert in between: "<<endl;
        cin>>temp->data;
        temp->next=NULL;
        cout<<"enter position to insert: "<<endl;
        cin>>pos;

        for(int i=0;i<pos-1;i++){
            curr=curr->next;
        }
        temp->next=curr->next;
        curr->next=temp;


    }

    void displayll(){
        node* curr = head;
        while(curr!=NULL){
            cout<<curr->data<<" ";
            curr=curr->next;
        }
        cout<<"\n";
    }

    void displayll2(){
        node* curr = head2;
        while(curr!=NULL){
            cout<<curr->data<<" ";
            curr=curr->next;
        }

    }

    void deletell(){
        node* q=NULL;
        node* curr=head;
        int pos;
        int x;
        cout<<"enter the position you wanna delete from: "<<endl;
        cin>>pos;
        if(pos==1){
            x=curr->data;
            head=curr->next;
            delete curr;
            cout<<"the deleted value is: "<<x<<endl;
        }

        else{
            for(int i=0;i<pos-1;i++){
                    q=curr;
                    curr=curr->next;

            }
            x=curr->data;
            q->next=curr->next;
            delete curr;
            //cout<<"the deleted value is: "<<x<<endl;
        }
    }

    void concatenate(){
        int flag = 0;
        node* curr = head;
        node* curr2 = head2;
        while(curr!=NULL){
            curr2 = head2;
            while(curr2!=NULL){
                if(curr->data==curr2->data){
                    curr->next=curr2->next;
                    curr2->next = NULL;
                    flag=1;break;
                }else{
                    curr2=curr2->next;
                }
            }
            if(flag == 1){
                break;
            }
            curr=curr->next;
        }

        curr = head;
        while(curr!=NULL){
            cout<<curr->data<<" ";
            curr=curr->next;
        }
    }

// void reversell(){
//     node* r=NULL;
//     node* q=NULL;
//     node* p=head;
//     while(p!=NULL){
//         r=q;
//         q=p;
//         p=p->next;
        
//     }
// }

};

int main(){
    llist ob;
    for(int i=0;i<5;i++){
        ob.insertll();
    }
    ob.displayll();
    for(int i=0;i<5;i++){
        ob.insertll2();
    }
    ob.displayll2();
    cout<<"hi"<<endl;
    //ob.insertat();
    //ob.displayll();
   // ob.deletell();
   ob.concatenate();
    //ob.displayll2();
    return 0;
}