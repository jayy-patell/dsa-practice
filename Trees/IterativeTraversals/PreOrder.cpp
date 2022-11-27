#include<iostream>
#include<stack>
using namespace std;

class Node{
    public:
    int data;
    Node* left;
    Node* right;

    Node(int d){
        this->data=d;
        this->left=NULL;
        this->right=NULL;
    }
};

Node* buildTree(Node* root){
    cout<<"Enter the data: "<<endl;
    int data; cin>>data;
    root = new Node(data);

    if(data==-1){
        return NULL;
    }

    cout<<"Enter data for inserting in left of "<<data<<endl;
    root->left = buildTree(root->left);
    cout<<"Enter data for inserting in right of "<<data<<endl;
    root->right = buildTree(root->right);
    return root;
}

void iterativePreOrder(Node* root){
    stack<Node*> st;
    st.push(root);

    while(!st.empty()){
        Node* curr = st.top();
        cout<<curr->data<<" ";
        st.pop();
        if(curr->right){
            st.push(curr->right);
        }
        if(curr->left){
            st.push(curr->left);
        }
    }
}

int main(){
    cout<<"Building Tree..";
    Node* root = NULL;
    root = buildTree(root);

    iterativePreOrder(root);
    return 0;
}