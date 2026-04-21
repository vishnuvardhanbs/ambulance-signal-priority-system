import 'package:flutter/material.dart';
import 'login_screen.dart';
import 'profile_screen.dart';

class ClearanceScreen extends StatefulWidget {
  const ClearanceScreen({super.key});

  @override
  State<ClearanceScreen> createState() => _ClearanceScreenState();
}

class _ClearanceScreenState extends State<ClearanceScreen> {
  List<Map<String, String>> requests = [
    {
      "ambulance": "APT-101",
      "location": "MG Road",
      "destination": "City Hospital",
      "eta": "3 mins",
      "priority": "Emergency",
    },
    {
      "ambulance": "APT-102",
      "location": "Brigade Road",
      "destination": "Apollo",
      "eta": "5 mins",
      "priority": "Emergency",
    },
    {
      "ambulance": "APT-103",
      "location": "Indiranagar",
      "destination": "Fortis",
      "eta": "7 mins",
      "priority": "Normal",
    },
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      drawer: buildDrawer(context),

      appBar: AppBar(
        backgroundColor: Colors.yellow.shade500,
        elevation: 0,
        shape: const RoundedRectangleBorder(
          borderRadius: BorderRadius.vertical(bottom: Radius.circular(16)),
        ),
        leading: Builder(
          builder: (context) => IconButton(
            icon: const Icon(Icons.menu, color: Colors.black),
            onPressed: () {
              Scaffold.of(context).openDrawer();
            },
          ),
        ),
        centerTitle: true,
        title: const Text(
          "Clearance Requests",
          style: TextStyle(color: Colors.black),
        ),
      ),

      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          AnimatedSwitcher(
            duration: const Duration(milliseconds: 350),
            transitionBuilder: (child, animation) {
              final slide = Tween<Offset>(
                begin: const Offset(0, 0.3),
                end: Offset.zero,
              ).animate(animation);

              return SlideTransition(
                position: slide,
                child: FadeTransition(
                  opacity: animation,
                  child: child,
                ),
              );
            },
            child: requests.isNotEmpty
                ? buildExpandedCard(requests[0])
                : const SizedBox(),
          ),
          const SizedBox(height: 12),
          ...requests.skip(1).map((req) => AnimatedSwitcher(
            duration: const Duration(milliseconds: 300),
            child: buildCollapsedCard(req),
          )).toList(),
        ],
      ),
    );
  }

  // 🔴 EXPANDED CARD (Top Priority)
  Widget buildExpandedCard(Map<String, String> req) {
    return AnimatedContainer(
      key: ValueKey(req['ambulance']),
      duration: const Duration(milliseconds: 300),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Colors.red.shade50,
        border: Border.all(color: Colors.red.shade400, width: 1.5),
        borderRadius: BorderRadius.circular(18),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.12),
            blurRadius: 14,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "Ambulance: ${req['ambulance']}",
            style: const TextStyle(fontWeight: FontWeight.bold),
          ),
          const SizedBox(height: 8),

          Text("Location: ${req['location']}"),
          Text("Destination: ${req['destination']}"),
          Text("ETA: ${req['eta']}"),

          const SizedBox(height: 8),

          Text(
            "Priority: ${req['priority']}",
            style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
          ),

          const SizedBox(height: 12),

          Row(
            children: [
              Expanded(
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      requests.remove(req);
                    });
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.green.shade600,
                    foregroundColor: Colors.white,
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text("Approve"),
                ),
              ),
              const SizedBox(width: 10),
              Expanded(
                child: ElevatedButton(
                  onPressed: () {
                    setState(() {
                      requests.remove(req);
                    });
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: Colors.red.shade600,
                    foregroundColor: Colors.white,
                    elevation: 3,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(10),
                    ),
                  ),
                  child: const Text("Reject"),
                ),
              ),
            ],
          )
        ],
      ),
    );
  }

  // 🟡 COLLAPSED CARD
  Widget buildCollapsedCard(Map<String, String> req) {
    return AnimatedContainer(
      duration: const Duration(milliseconds: 250),
      margin: const EdgeInsets.only(bottom: 12),
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: Colors.white,
        border: Border.all(color: Colors.black12),
        borderRadius: BorderRadius.circular(14),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.12),
            blurRadius: 14,
            offset: const Offset(0, 6),
          ),
        ],
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          // Left info
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text("Destination: ${req['destination']}",
                  style: const TextStyle(fontWeight: FontWeight.bold)),
              const SizedBox(height: 4),
              Text("Location: ${req['location']}"),
              Text("ETA: ${req['eta']}"),
            ],
          ),

          // Priority
          Text(
            req['priority']!,
            style: TextStyle(
              color: req['priority'] == "Emergency" ? Colors.red : Colors.black,
            ),
          ),
        ],
      ),
    );
  }

  Widget buildDrawer(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.all(20),
            color: Colors.yellow.shade500,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: const [
                SizedBox(height: 50),
                Text(
                  "Police Officer",
                  style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                ),
                SizedBox(height: 5),
                Text("Badge ID: P-101"),
              ],
            ),
          ),

         ListTile(
  leading: const Icon(Icons.person, color: Colors.blue),
  title: const Text("Profile"),
  onTap: () {
    Navigator.pop(context);

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => const ProfileScreen(),
      ),
    );
  },
),

ListTile(
  leading: const Icon(Icons.logout, color: Colors.red),
  title: const Text("Logout"),
  onTap: () {
    showLogoutDialog(context);
  },
),
        ],
      ),
    );
  }

  void showLogoutDialog(BuildContext context) {
    showDialog(
      context: context,
      builder: (context) {
        return AlertDialog(
          title: const Text("Confirm Logout"),
          content: const Text("Are you sure you want to logout?"),
          actions: [
            TextButton(
              onPressed: () {
                Navigator.pop(context);
              },
              child: const Text("Cancel"),
            ),
            TextButton(
              onPressed: () {
                Navigator.pop(context);
                Navigator.pushAndRemoveUntil(
                  context,
                  MaterialPageRoute(
                    builder: (context) => const PoliceLoginScreen(),
                  ),
                  (route) => false,
                );
              },
              child: const Text("Logout", style: TextStyle(color: Colors.red)),
            ),
          ],
        );
      },
    );
  }
}