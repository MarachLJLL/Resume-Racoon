//
// -- Existing helper functions --
//

// 1. Start a single flow run
async function startFlowRun(prompt) {
    const token = "7c7ea544364f499690f6a27553de249a";
    const userId = "gXP34cvJNEhI1ybry9EawZSJgcG3"; // required
    const savedItemId = "uY4NbZ767EzFYB4BnxazWb";    // required
  
    // Build pipeline inputs for this single question
    const pipelineInputs = [
      { input_name: "prompt", value: prompt },
      { input_name: "context", value: "please give the correct answers to the prompts provided as they will be pasted raw into job application questions." +
        "do not say Here is my response to the provided prompt. Do not say based on the provided profile. Just directly answer the question"
       }
    ];
  
    const bodyData = {
      saved_item_id: savedItemId,
      user_id: userId,
      pipeline_inputs: pipelineInputs
    };
  
    // POST to start_pipeline
    const response = await fetch("https://api.gumloop.com/api/v1/start_pipeline", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(bodyData)
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error starting flow: ${response.status} - ${errorText}`);
    }
  
    const data = await response.json();
    console.log("Flow Run Started:", data);
  
    if (!data.run_id) {
      throw new Error("No run_id returned from start_pipeline");
    }
    
    return data.run_id;
  }
  
  // 2. Get run details (used for polling)
  async function getRunDetails(token, runId, userId = null, projectId = null) {
    if (!userId && !projectId) {
      throw new Error("Either user_id or project_id must be provided to /get_pl_run.");
    }
  
    const url = `https://api.gumloop.com/api/v1/get_pl_run?run_id=${runId}&user_id=${userId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error retrieving run details: ${response.status} - ${errorText}`);
    }
  
    const data = await response.json();
    console.log("Run Details:", data);
    return data;
  }
  
  // 3. Poll until flow completes or fails
  async function pollFlowRun(token, runId, userId, intervalMs = 5000) {
    while (true) {
      try {
        const details = await getRunDetails(token, runId, userId);
        console.log("Polling State:", details.state);
  
        if (details.state === "DONE") {
          console.log("Flow completed successfully!");
          console.log("Outputs:", details.outputs);
          return details.outputs; // Return the final outputs
        } else if (["FAILED", "TERMINATED"].includes(details.state)) {
          console.error("Flow run failed or was terminated!");
          console.error("Logs:", details.log);
          throw new Error("Flow run failed or was terminated.");
        }
      } catch (error) {
        console.error("Error polling flow:", error);
        throw error; // Rethrow so we can handle it in our top-level function
      }
  
      // Wait before next poll
      await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }
  }
  
  //
  // -- New Wrapper for a single question --
  //
  async function askSingleQuestion(prompt) {
    try {
      const token = "7c7ea544364f499690f6a27553de249a";
      const userId = "gXP34cvJNEhI1ybry9EawZSJgcG3";
  
      // 1. Start flow for this prompt
      const runId = await startFlowRun(prompt);
  
      // 2. Poll until done, retrieve final outputs
      const outputs = await pollFlowRun(token, runId, userId, 5000);
  
      // Return the final output for this question
      return outputs;
    } catch (error) {
      console.error(`askSingleQuestion failed for prompt "${prompt}":`, error);
      throw error;
    }
  }
  
  //
  // -- Handling multiple questions in sequence --
  //
  async function askMultipleQuestions(questions) {
    // This will store the answers for each question
    const allAnswers = [];
  
    for (const prompt of questions) {
      console.log(`\nAsking question: "${prompt}"`);
      const result = await askSingleQuestion(prompt);
  
      // result is your outputs object; store or parse as needed
      allAnswers.push({ prompt, outputs: result });
    }
  
    return allAnswers;
  }
  
  //
  // -- Example usage of multiple prompts --
  //
  
  // (async () => {
  //   try {
  //     // An array of questions you want to ask
  //     const questions = [
  //       "what is 2+2",
  //       "what is 4+4",
  //       "what is 8+8"
  //     ];
  
  //     // Ask them sequentially
  //     const results = await askMultipleQuestions(questions);
  
  //     // Log final results
  //     console.log("\nAll questions answered!");
  //     console.log(JSON.stringify(results, null, 2));
      
  //     // Each item in `results` is:
  //     // {
  //     //   prompt: "...",
  //     //   outputs: { /* from final flow output for that prompt */ }
  //     // }
  //   } catch (error) {
  //     console.error("Overall error:", error);
  //   }
  // })();
  