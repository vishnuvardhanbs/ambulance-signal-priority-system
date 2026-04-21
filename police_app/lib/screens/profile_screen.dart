    import 'package:flutter/material.dart';

  class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  static const String name = "Inspector Rajesh Kumar";
  static const String policeId = "P-101";
  static const String rank = "Traffic Inspector";
  static const String station = "Central Traffic Police Station";
  static const String junction = "MG Road Junction";
  static const String shift = "Morning Shift";
  static const String status = "On Duty";
  static const String totalRequestsHandled = "142";

      @override
      Widget build(BuildContext context) {
        return Scaffold(
          backgroundColor: const Color(0xFFF8F9FA), // Light modern background
          appBar: AppBar(
            title: const Text("Profile"),
            backgroundColor: Colors.white,
            foregroundColor: Colors.black,
            elevation: 1,
            leading: IconButton(
              icon: const Icon(Icons.arrow_back),
              onPressed: () => Navigator.pop(context),
            ),
          ),
          body: SingleChildScrollView(
            padding: const EdgeInsets.all(20),
            child: Column(
              children: [
                // Profile Header
                Center(
                  child: Column(
                    children: [
                      // Profile Picture with border
                      Container(
                        decoration: BoxDecoration(
                          shape: BoxShape.circle,
                          border: Border.all(color: Colors.blue, width: 4),
                        ),
                        child: const CircleAvatar(
                          radius: 70,
                          backgroundColor: Colors.white,
                          child: Icon(
                            Icons.person,
                            size: 85,
                            color: Colors.blue,
                          ),
                        ),
                      ),
                      const SizedBox(height: 16),
                      Text(
                        name,
                        style: const TextStyle(
                          fontSize: 26,
                          fontWeight: FontWeight.bold,
                          color: Colors.black87,
                        ),
                      ),
                      const Text(
                        "Ambulance Driver",
                        style: TextStyle(
                          fontSize: 16,
                          color: Colors.grey,
                        ),
                      ),
                    ],
                  ),
                ),

                const SizedBox(height: 40),

                // Information Card
                Card(
                  elevation: 3,
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(20),
                  ),
                  child: Padding(
                    padding: const EdgeInsets.all(24),
                    child: Column(
                      children: [
                        _buildInfoRow("Police ID", policeId),
                        _buildInfoRow("Rank", rank),
                        _buildInfoRow("Station", station),
                        _buildInfoRow("Junction", junction),
                        _buildInfoRow("Shift", shift),
                        _buildInfoRow("Status", status),
                        _buildInfoRow("Requests Handled", totalRequestsHandled),
                                              ],
                    ),
                  ),
                ),

                const SizedBox(height: 50),

                // Contact Control Room Button
                SizedBox(
                  width: double.infinity,
                  height: 62,
                  child: ElevatedButton.icon(
                    onPressed: () {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(
                          content: Text("Contacting Control Room..."),
                          backgroundColor: Colors.blue,
                        ),
                      );
                    },
                    icon: const Icon(Icons.phone),
                    label: const Text(
                      "Contact Control Room",
                      style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.blue,
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(16),
                      ),
                      elevation: 4,
                    ),
                  ),
                ),
              ],
            ),
          ),
        );
      }

      // Helper function for each info row
      Widget _buildInfoRow(String label, String value) {
        return Padding(
          padding: const EdgeInsets.symmetric(vertical: 14),
          child: Row(
            children: [
              Text(
                label,
                style: const TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w600,
                  color: Colors.black87,
                ),
              ),
              const Spacer(),
              Text(
                value,
                style: const TextStyle(
                  fontSize: 17,
                  fontWeight: FontWeight.w500,
                  color: Colors.black87,
                ),
              ),
            ],
          ),
        );
      }
    }