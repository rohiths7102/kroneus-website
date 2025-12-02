# 🔧 HOW TO FIX MICROSOFT 365 BLOCKING EMAILJS

## Problem
Microsoft 365 error: `550 5.7.708 Service unavailable. Access denied, traffic not accepted from this IP`

This means Microsoft 365 is blocking EmailJS's sending servers.

---

## ✅ OPTION 1: WHITELIST EMAILJS IN MICROSOFT 365 (Best for keeping current email)

### Step 1: Login to Microsoft 365 Admin Center
```
https://admin.microsoft.com
```

### Step 2: Go to Exchange Admin Center
1. Click "Admin centers" (left sidebar)
2. Click "Exchange"

### Step 3: Create Transport Rule
1. Go to "Mail flow" → "Rules"
2. Click "+" (Add a rule)
3. Select "Create a new rule"

### Step 4: Configure Rule
```
Name: Allow EmailJS
Apply this rule if: The sender's IP address is in any of these ranges or exactly matches
  - Add: 185.80.186.0/24
  - Add: 185.80.187.0/24
  
Do the following: Modify the message properties
  - Set the spam confidence level (SCL) to: Bypass spam filtering

Save the rule
```

### Step 5: Alternative - Whitelist Sender Domain
```
Apply this rule if: The sender domain is
  - emailjs.com

Do the following:
  - Set SCL to -1 (bypass spam filtering)
```

### Step 6: Wait 15-30 Minutes
Rules take time to propagate. Test the contact form after 30 minutes.

---

## ✅ OPTION 2: USE GMAIL INSTEAD (Fastest - No Admin Access Needed)

### Why Gmail is Better:
- ✅ No IP blocking issues
- ✅ Works immediately
- ✅ More reliable for contact forms
- ✅ No admin access required

### Setup Gmail:
1. Create Gmail account: `rohithkroneus@gmail.com`
2. Or use existing Gmail
3. I'll update the website to send there instead

### I'll Need:
```
Your Gmail address: _______________________
```

---

## ✅ OPTION 3: USE DIFFERENT EMAIL SERVICE (Advanced)

Instead of EmailJS, use:
- **Formspree** (easier, no IP issues)
- **SendGrid** (enterprise-grade)
- **Gmail SMTP** (direct Gmail integration)

Would require reconfiguring the form (I can do this).

---

## 📊 COMPARISON

| Option | Speed | Effort | Admin Access Required |
|--------|-------|--------|----------------------|
| Gmail | ⚡ Instant | 🟢 Easy | ❌ No |
| Whitelist | 🕐 30 min | 🟡 Medium | ✅ Yes |
| Different Service | 🕐 1 hour | 🔴 Hard | ❌ No |

---

## 💡 MY RECOMMENDATION

**Use Gmail for contact forms:**

**Pros:**
- ✅ Works immediately
- ✅ No Microsoft admin access needed
- ✅ No IP blocking issues
- ✅ More reliable for public forms

**Current Microsoft email stays for:**
- ✅ Business communications
- ✅ Professional correspondence
- ✅ Team emails

**Just add one line for me:**
```
Gmail for contact form: _______________________
```

And I'll update it in 2 minutes!

---

## 🚀 QUICK FIX (RECOMMENDED)

**Reply with:**
```
My Gmail for contact forms: rohithkroneus@gmail.com
```

**I'll update:**
1. Contact form email recipient
2. EmailJS configuration
3. Success message display

**Done in 2 minutes!** ⚡

---

© 2025 KRONEUS - Email Configuration Help
