#include <iostream>
#include <vector>
#include <string>
#include <unordered_set>

using namespace std;

class Solution
{
public:
    bool wordBreak(string s, vector<string> &wordDict)
    {
        // Memoization
        vector<bool> dp(s.size() + 1, false);

        unordered_set<string> dict;
        for (auto w : wordDict)
            dict.insert(w);

        dp[0] = true;
        for (int i = 0; i <= s.size(); ++i)
        {
            for (int j = 0; j < i; ++j)
            {
                if (dp[j])
                {
                    string word = s.substr(j, i - j);
                    if (dict.find(word) != dict.end())
                    {
                        dp[i] = true;
                        break; // next i
                    }
                }
            }
        }

        for (int i = 0; i < dp.size(); i++)
        {
            cout << dp[i] << " ";
        }
        cout << endl;
        return dp[s.size()];

        // Bottom Up DP
        //  vector<bool> dp(s.size()+1, false);
        //  dp[s.size()] = true; //matches entire string->true. Now go till zero to get ans.

        // for(int i=s.size()-1; i>=0; i--){
        //     for(auto w:wordDict){
        //         if( (i+w.size() <= s.size()) && s.substr(i, w.size()) == w ){
        //             dp[i] = dp[i+w.size()];
        //         }
        //         if(dp[i])
        //             break;
        //     }
        // }

        // return dp[0];
    }
};

int main()
{
    Solution s;
    vector<string> wordDict = {"leet", "code"};
    string str = "leetcode";
    cout << s.wordBreak(str, wordDict) << endl;

    return 0;
}