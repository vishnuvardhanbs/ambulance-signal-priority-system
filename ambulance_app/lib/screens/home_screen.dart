import 'package:flutter/material.dart';
import 'login_screen.dart';
import 'profile_screen.dart';
import 'trip_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  String status = "Standby";
  bool isEmergency = false;
  double dragPosition = 0;

  void _activateEmergency() {
    // Directly navigate to Trip Screen without showing red emergency state on home
    Navigator.push(
      context,
      MaterialPageRoute(builder: (_) => const TripScreen()),
    );

    // Reset slider
    setState(() {
      dragPosition = 0;
      isEmergency = false;
      status = "Standby";
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      drawer: Drawer(
        child: Column(
          children: [
            Container(
              width: double.infinity,
              padding: const EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: const Color.fromARGB(255, 224, 219, 58),
                border: Border(bottom: BorderSide(color: Colors.black, width: 1.2)),
              ),
              child: const Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  SizedBox(height: 40),
                  Text("Driver Name", style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold)),
                  SizedBox(height: 5),
                  Text("Ambulance ID: APT-101"),
                ],
              ),
            ),
            ListTile(
              leading: const Icon(Icons.person),
              title: const Text("Profile"),
              onTap: () {
                Navigator.pop(context);
                Navigator.push(context, MaterialPageRoute(builder: (_) => const ProfileScreen()));
              },
            ),
            ListTile(
              leading: const Icon(Icons.logout),
              title: const Text("Logout"),
              onTap: () async {
                bool? confirm = await showDialog(
                  context: context,
                  builder: (context) => const LogoutConfirmPopup(),
                );
                if (confirm == true) {
                  Navigator.pushAndRemoveUntil(
                    context,
                    MaterialPageRoute(builder: (_) => const LoginScreen()),
                    (route) => false,
                  );
                }
              },
            ),
          ],
        ),
      ),
      appBar: AppBar(
        backgroundColor: const Color.fromARGB(255, 205, 227, 38),
        title: Text(status, style: const TextStyle(color: Colors.black, fontWeight: FontWeight.bold)),
        leading: Builder(
          builder: (context) => IconButton(
            icon: const Icon(Icons.menu),
            onPressed: () => Scaffold.of(context).openDrawer(),
          ),
        ),
      ),
      body: Column(
        children: [
          Expanded(
            child: Container(
              margin: const EdgeInsets.all(15),
              decoration: BoxDecoration(
                color: Colors.grey[200],
                border: Border.all(color: Colors.black, width: 1.2),
                borderRadius: BorderRadius.circular(16),
              ),
              child: const Center(
                child: Text("MAP VIEW (to be integrated)"),
              ),
            ),
          ),

          // Slide to Initiate Emergency Ride
          Padding(
            padding: const EdgeInsets.all(20),
            child: LayoutBuilder(
              builder: (context, constraints) {
                double maxWidth = constraints.maxWidth;
                double handleSize = 60;

                return Container(
                  height: 70,
                  decoration: BoxDecoration(
                    color: const Color.fromARGB(255, 241, 230, 25),
                    borderRadius: BorderRadius.circular(40),
                    border: Border.all(color: Colors.black, width: 1.2),
                  ),
                  child: Stack(
                    children: [
                      const Center(
                        child: Text(
                          "Slide to initiate emergency ride",
                          style: TextStyle(fontWeight: FontWeight.w500),
                        ),
                      ),
                      AnimatedPositioned(
                        duration: const Duration(milliseconds: 200),
                        left: dragPosition,
                        child: GestureDetector(
                          onHorizontalDragUpdate: (details) {
                            setState(() {
                              dragPosition += details.delta.dx;
                              if (dragPosition < 0) dragPosition = 0;
                              if (dragPosition > maxWidth - handleSize) {
                                dragPosition = maxWidth - handleSize;
                              }
                            });
                          },
                          onHorizontalDragEnd: (details) {
                            double threshold = (maxWidth - handleSize) * 0.7;
                            if (dragPosition >= threshold) {
                              _activateEmergency();
                            } else {
                              setState(() => dragPosition = 0);
                            }
                          },
                          child: Container(
                            width: handleSize,
                            height: handleSize,
                            margin: const EdgeInsets.all(5),
                            decoration: BoxDecoration(
                              color: Colors.red.shade600,
                              borderRadius: BorderRadius.circular(30),
                              border: Border.all(color: Colors.black, width: 1.2),
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                );
              },
            ),
          ),
        ],
      ),
    );
  }
}

// Popups
class ConfirmCancelPopup extends StatelessWidget {
  const ConfirmCancelPopup({super.key});
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text("Cancel Emergency?"),
      content: const Text("Are you sure you want to cancel the emergency ride?"),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context, false), child: const Text("No")),
        ElevatedButton(
          style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
          onPressed: () => Navigator.pop(context, true),
          child: const Text("Yes"),
        ),
      ],
    );
  }
}

class LogoutConfirmPopup extends StatelessWidget {
  const LogoutConfirmPopup({super.key});
  @override
  Widget build(BuildContext context) {
    return AlertDialog(
      title: const Text("Logout?"),
      content: const Text("Are you sure you want to logout?"),
      actions: [
        TextButton(onPressed: () => Navigator.pop(context, false), child: const Text("No")),
        ElevatedButton(
          style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
          onPressed: () => Navigator.pop(context, true),
          child: const Text("Yes"),
        ),
      ],
    );
  }
}