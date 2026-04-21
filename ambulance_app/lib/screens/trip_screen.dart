import 'package:flutter/material.dart';

class TripScreen extends StatefulWidget {
  const TripScreen({super.key});

  @override
  State<TripScreen> createState() => _TripScreenState();
}

class _TripScreenState extends State<TripScreen> {
  double _sliderValue = 0;
  bool _showContactButton = false;   // Contact button starts hidden

    void _showOverrideDialog() {
    showDialog(
      context: context,
      barrierDismissible: false,
      builder: (context) => AlertDialog(
        shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(20)),
        title: const Text(
          "Override Signal Priority?",
          style: TextStyle(fontWeight: FontWeight.bold),
        ),
        content: const Text("Do you want to override the signal?"),
        actions: [
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              setState(() {
                _sliderValue = 0.0;
                _showContactButton = false;
              });
            },
            child: const Text("No", style: TextStyle(color: Colors.grey)),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              setState(() {
                _showContactButton = true;
              });
              _showDestinationInput();
            },
            child: const Text(
              "Yes",
              style: TextStyle(fontWeight: FontWeight.bold, color: Colors.green),
            ),
          ),
          // Contact Control Room Button added inside dialog
          const SizedBox(height: 10),
          SizedBox(
            width: double.infinity,
            child: ElevatedButton.icon(
              onPressed: () {
                Navigator.pop(context);
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(
                    content: Text("Contacting Control Room..."),
                    backgroundColor: Color.fromARGB(255, 207, 218, 49),
                  ),
                );
              },
              icon: const Icon(Icons.phone),
              label: const Text("Contact Control Room"),
              style: ElevatedButton.styleFrom(
                backgroundColor: const Color.fromARGB(255, 225, 228, 44),
                foregroundColor: Colors.white,
              ),
            ),
          ),
        ],
      ),
    );
  }

  void _showDestinationInput() {
    final TextEditingController controller = TextEditingController();

    showDialog(
      context: context,
      builder: (context) => AlertDialog(
        title: const Text("Enter Destination"),
        content: TextField(
          controller: controller,
          decoration: const InputDecoration(
            hintText: "Enter destination location",
            border: OutlineInputBorder(),
          ),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(context),
            child: const Text("Cancel"),
          ),
          TextButton(
            onPressed: () {
              Navigator.pop(context);
              if (controller.text.trim().isNotEmpty) {
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                    content: Text("Route set to: ${controller.text}"),
                    backgroundColor: const Color.fromARGB(255, 204, 229, 59),
                  ),
                );
              }
            },
            child: const Text("Confirm"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      appBar: AppBar(
        title: const Text("Active Trip"),
        backgroundColor: Colors.white,
        foregroundColor: Colors.black,
        elevation: 1,
        leading: IconButton(
          icon: const Icon(Icons.arrow_back),
          onPressed: () => Navigator.pop(context),
        ),
        actions: [
          const Padding(
            padding: EdgeInsets.only(right: 16),
            child: Chip(
              label: Text("ACTIVE", style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
              backgroundColor: Color.fromARGB(255, 208, 224, 41),
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Map Window
          Expanded(
            flex: 5,
            child: Container(
              margin: const EdgeInsets.all(16),
              decoration: BoxDecoration(
                border: Border.all(color: const Color.fromARGB(255, 221, 226, 77), width: 3),
                borderRadius: BorderRadius.circular(16),
              ),
              child: Stack(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      color: Colors.grey[100],
                      borderRadius: BorderRadius.circular(12),
                    ),
                    child: const Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(Icons.map, size: 90, color: Color.fromARGB(255, 228, 211, 61)),
                          SizedBox(height: 16),
                          Text(
                            "MAP WINDOW",
                            style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold, color: Color.fromARGB(255, 206, 225, 66)),
                          ),
                          Text("Live route tracking", style: TextStyle(color: Colors.grey)),
                        ],
                      ),
                    ),
                  ),
                  Positioned(
                    top: 20,
                    left: 20,
                    right: 20,
                    child: Container(
                      padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
                      decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(30),
                        border: Border.all(color: const Color.fromARGB(255, 227, 211, 71), width: 2),
                      ),
                      child: const Row(
                        children: [
                          Icon(Icons.location_on, color: Colors.red),
                          SizedBox(width: 10),
                          Text("Destination", style: TextStyle(fontWeight: FontWeight.bold)),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),

          // Small Override Slider
          // Custom Override Slider
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Column(
              children: [
                const Text(
                  "Route Override",
                  style: TextStyle(
                    fontSize: 16,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 12),

                GestureDetector(
                  onHorizontalDragUpdate: (details) {
                    setState(() {
                      _sliderValue += details.delta.dx;

                      // Keep slider inside the container
                      if (_sliderValue < 0) _sliderValue = 0;
                      if (_sliderValue > 290) _sliderValue = 290;
                    });
                  },
                  onHorizontalDragEnd: (details) {
                    if (_sliderValue > 220 && !_showContactButton) {
                      _showOverrideDialog();
                    } else {
                      setState(() {
                        _sliderValue = 0;
                      });
                    }
                  },
                  child: Container(
                    height: 70,
                    width: double.infinity,
                    decoration: BoxDecoration(
                      color: const Color.fromARGB(255, 227, 230, 43),
                      borderRadius: BorderRadius.circular(40),
                      border: Border.all(
                        color: Colors.black,
                        width: 1.2,
                      ),
                    ),
                    child: Stack(
                      alignment: Alignment.centerLeft,
                      children: [
                        const Center(
                          child: Text(
                            "Slide to override the trip",
                            style: TextStyle(
                              fontSize: 16,
                              fontWeight: FontWeight.w500,
                              color: Colors.black87,
                            ),
                          ),
                        ),

                        Positioned(
                          left: _sliderValue,
                          child: Container(
                            width: 58,
                            height: 58,
                            decoration: BoxDecoration(
                              color: Colors.red,
                              shape: BoxShape.circle,
                              border: Border.all(
                                color: Colors.black,
                                width: 1.5,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),

          // Contact Control Room Button - Appears ONLY after "Yes"
                 const SizedBox(height: 20),
        ],
      ),
    );
  }
}