# 🎯 Final Setup for Zapier Webhook

## ⚠️ Notion API Issue

The Notion API is not persisting properties when added programmatically. You need to add them manually in Notion.

---

## 📊 Your Database

**Database ID:** `2995c25944da80a5b5d1f0eb9db74a36`  
**URL:** https://www.notion.so/2995c25944da80a5b5d1f0eb9db74a36

---

## ✅ Manual Setup (5 minutes)

Open your database and click **"+ New property"** for each field below:

### **Properties to Add:**

1. `1. Profession` - Select (Psychologist, Counsellor, Social Worker, Psychiatrist, Psychotherapist, Art Therapist, Other)
2. `2. Profession Other` - Text
3. `3. Years in Practice` - Select (0-2 years, 3-5 years, 6-10 years, 10+ years)
4. `4. Client Types` - Multi-select (Adults, Teens, Couples, LGBTQ+, Trauma-focused, Neurodivergent, Other)
5. `5. Client Types Other` - Text
6. `6. Modalities` - Multi-select (CBT, DBT, ACT, EMDR, Person-Centred, Somatic, Gestalt, Psychodynamic, Relationship Therapy, Art Therapy, Other)
7. `7. Modalities Other` - Text
8. `8. How Clients Find You` - Multi-select (Referrals, Directories, Word of mouth, Online search, Social media, Other)
9. `9. How Clients Find You Other` - Text
10. `10. Great Match Factors` - Multi-select (Shared core values, Similar communication style, Trust, Life goal alignment, Lived experience, Shared religious beliefs/background, Shared cultural background, Shared experience of a diagnosis (ADHD, Autism, OCD, Addiction, etc), Other)
11. `11. Great Match Other` - Text
12. `12. Biggest Gap` - Text
13. `13. Screening Clients` - Select (Yes, No)
14. `14. Open to Sharing` - Select (Yes, Maybe, No)
15. `15. Which Questions Matter` - Multi-select (Communication style, Relationship style, Personality traits, Lived experience, Values and beliefs, Therapeutic work style and boundaries, All of the above, None, Other)
16. `16. Which Questions Matter Other` - Text
17. `17. Personality Test` - Select (Yes, No, Maybe)
18. `18. Too Personal` - Multi-select (Trauma history, Religious beliefs/background, Political views, Personal relationships, Financial situation, Cultural background, None, Other)
19. `19. Too Personal Other` - Text
20. `20. Profile Detail Level` - Select (1-10 scale)
21. `21. Onboarding Time` - Select (2-3 min, 5 min, 10 min, 15 min+, As long as it takes)
22. `22. Trust AI Matching` - Select (Yes, Maybe, No, I'm unsure about AI)
23. `23. Free Listing Interest` - Select (Yes, Maybe later, No)
24. `24. Future Contact` - Select (Yes, No)
25. `25. Email` - Email
26. `26. Comments` - Text
27. `27. Consent Status` - Select (Pending, Granted, Withdrawn)
28. `28. Processing Status` - Select (New, In Review, Processed, Follow-up Needed)
29. `29. Notes` - Text

---

## 🔗 After Setup

Once all properties are added manually in Notion:

1. ✅ Database is ready for Zapier webhook
2. ✅ Property names match the survey exactly (numbered)
3. ✅ Typebot → Zapier → Notion flow will work

---

**Note:** The Notion API has a known issue where `databases.update()` and `databases.create()` succeed but don't persist properties. Manual setup is required.

